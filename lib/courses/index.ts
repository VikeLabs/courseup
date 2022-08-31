import { Course, Faculty, Prisma } from '@prisma/client';

import { getCourseDescription } from '../banner';
import { Fetch } from '../banner/fetch';
import { Section } from '../banner/types';
import { fetchCourses, fetchCourseDetailsByPid } from '../kuali';
import { prisma } from '../prisma';

import { CourseDetails } from './types';

export async function getCourseDetailByPid(term: string, pid: string) {
  const course = await prisma.course.findFirst({
    where: {
      term: term,
      pid: pid,
    },
  });
  return course;
}

export async function upsertCourses(term: string) {
  const courses = await fetchCourses(term);
  await Promise.all(
    courses.map(async (course) => {
      const details = await fetchCourseDetailsByPid(term, course.pid);
      const data = {
        pid: details.pid,
        term,
        subject: course.subject,
        subjectDescription: details.subjectCode.description.replace(`(${course.subject})`, ''),
        code: course.code,
        title: details.title,
        description: details.description,
        dateStart: details.dateStart,
        credits: details.credits,
        hoursCatalog: details.hoursCatalog,
        preAndCorequisites: details.preAndCorequisites,
        preOrCorequisites: details.preOrCorequisites,
        formally: details.formerlyNotesText,
      };
      await prisma.course.upsert({
        where: {
          // eslint-disable-next-line camelcase
          term_subject_code: {
            term: term,
            subject: course.subject,
            code: course.code,
          },
        },
        create: data,
        update: data,
      });
    })
  );
}

export async function getFacultyIds(emails: string[]) {
  // create a set of keys in which we're interested in checking if they exist in the database
  // woo sql~ :D
  const result = await prisma.$queryRaw<Pick<Faculty, 'id' | 'email'>[]>`
    SELECT DISTINCT id,email FROM "Faculty" WHERE email IN (${Prisma.join(emails)})`;
  // Prisma.join safely joins an array of strings to a comma-separated string for SQL
  // In this query we look for courses that match the keys in the keys array and return them
  // This makes sure we only send one query to check for courses.

  // map for hash join (map the db course id to input courses)
  const mapping = new Map<string, string>(result.map(({ id, email }) => [email, id]));
  return mapping;
}

export async function getCourseIds(courses: { subject: string; code: string }[], term: string) {
  // create a set of keys in which we're interested in checking if they exist in the database
  // woo sql~ :D
  const result = await prisma.$queryRaw<Pick<Course, 'id' | 'subject' | 'code'>[]>`
    SELECT DISTINCT id,subject,code FROM "Course" WHERE (subject,code) IN 
      (${Prisma.join(courses.map(({ subject, code }) => Prisma.sql`(${subject}, ${code})`))})
    AND term = ${term}`;
  // Prisma.join safely joins an array of strings to a comma-separated string for SQL
  // In this query we look for courses that match the keys in the keys array and return them
  // This makes sure we only send one query to check for courses.

  // map for hash join (map the db course id to input courses)
  const mapping = new Map<string, string>(result.map(({ id, subject, code }) => [`${subject}${code}`, id]));
  return mapping;
}

export async function upsertSections(fc: Fetch, term: string, sections: Section[]) {
  // store term, subject code to id mapping

  const courseIds = await getCourseIds(
    sections.map((section) => ({ subject: section.subject, code: section.courseNumber })),
    term
  );

  const emails = sections.flatMap((section) => section.faculty.flatMap((f) => f.emailAddress));
  const facultyIds = await getFacultyIds(emails.filter((email) => email) as string[]);

  await Promise.all(
    sections.map(async (s) => {
      // reject non-undergraduate courses (e.g. undergraduate courses start with 1XX, 2XX, 3XX, 4XX)
      if (!s.courseNumber.match(/^[1-4][0-9]{2}\w{0,1}/)) return;

      const id = courseIds.get(`${s.subject}${s.courseNumber}`);

      if (!id) {
        console.error(`course not found: ${s.term} ${s.subject} ${s.courseNumber}`);
        return;
        // throw new Error(`course not found: ${s.term}, ${s.subject}, ${s.courseNumber}`);
      }

      const courseDescription = await getCourseDescription(fc, s.term, s.courseReferenceNumber);

      const sectionInput = {
        courseId: id,
        courseReferenceNumber: s.courseReferenceNumber,
        campusDescription: s.campusDescription,
        additionalInformation: courseDescription,
        // topic courses have a different title than the calendar entry
        title: s.courseTitle,
        isSectionLinked: s.isSectionLinked,
        openSection: s.openSection,
        scheduleTypeDescription: s.scheduleTypeDescription,
        // where sequence number is like A01, B01, T01, etc.
        sequenceNumber: s.sequenceNumber,
        // creditHourHigh: s.creditHourHigh?.toString(),
        // creditHourLow: s.creditHourLow.toString(),
        // creditHourIndicator: s.creditHourIndicator,
        // creditHours: s.creditHours?.toString(),
        instructionalMethod: s.instructionalMethod,
        instructionalMethodDescription: s.instructionalMethodDescription,
        crossList: s.crossList,
        crossListAvailable: s.crossListAvailable,
        crossListCapacity: s.crossListCapacity,
        linkIdentifier: s.linkIdentifier,
        partOfTerm: s.partOfTerm,
        updatedAt: new Date(),
      };

      // upsert section requires the courseId
      const section = await prisma.section.upsert({
        where: {
          // eslint-disable-next-line camelcase
          courseId_courseReferenceNumber: {
            courseId: id,
            courseReferenceNumber: s.courseReferenceNumber,
          },
        },
        create: sectionInput,
        update: sectionInput,
      });

      // store faculty id in cache

      for (const f of s.faculty) {
        if (!f.emailAddress) {
          console.error(`no email address for ${f.displayName}`);
          continue;
        }

        const facultyId = facultyIds.get(f.emailAddress);

        if (!facultyId) {
          const fac = {
            email: f.emailAddress,
            name: f.displayName,
            updatedAt: new Date(),
          };
          try {
            await prisma.faculty.upsert({
              where: {
                email: f.emailAddress,
              },
              create: fac,
              update: fac,
            });
          } catch (e) {
            console.error(e);
          }
        }
      }

      await prisma.$transaction([
        prisma.facultiesOnSection.deleteMany({
          where: {
            sectionId: section.id,
          },
        }),
        prisma.facultiesOnSection.createMany({
          data: s.faculty
            .map((f) => ({
              sectionId: section.id,
              facultyId: f.emailAddress ? facultyIds.get(f.emailAddress) : null,
              primary: f.primaryIndicator,
              updatedAt: new Date(),
            }))
            .filter((f) => f.facultyId)
            .map((f) => ({
              ...f,
              facultyId: f.facultyId as string,
            })),
        }),
      ]);

      await prisma.$transaction([
        prisma.meetingTime.deleteMany({
          where: {
            sectionId: section.id,
          },
        }),
        prisma.meetingTime.createMany({
          data: s.meetingsFaculty.map(({ courseReferenceNumber, meetingTime: m }) => ({
            sectionId: section.id,
            term: s.term,
            courseReferenceNumber,
            endDate: m.endDate,
            endTime: m.endTime,
            startDate: m.startDate,
            beginTime: m.beginTime,
            meetingScheduleType: m.meetingScheduleType,
            meetingType: m.meetingType,
            meetingTypeDescription: m.meetingTypeDescription,
            campus: m.campus,
            campusDescription: m.campusDescription,
            building: m.building,
            buildingDescription: m.buildingDescription,
            room: m.room,

            hoursWeek: m.hoursWeek?.toString(),
            creditHourSession: m.creditHourSession?.toString(),

            category: m.category,
            monday: m.monday,
            tuesday: m.tuesday,
            wednesday: m.wednesday,
            thursday: m.thursday,
            friday: m.friday,
            saturday: m.saturday,
            sunday: m.sunday,
            updatedAt: new Date(),
          })),
        }),
      ]);

      await prisma.sectionCapacity.create({
        data: {
          section: {
            connect: {
              id: section.id,
            },
          },
          enrollment: s.enrollment,
          maximumEnrollment: s.maximumEnrollment,
          seatsAvailable: s.seatsAvailable,
          waitCount: s.waitCount,
          waitAvailable: s.waitAvailable,
          waitCapacity: s.waitCapacity,
        },
      });
    })
  );
}

type CourseResponse = {
  pid: string;
  title: string;
  subject: string;
  code: string;
};

export async function getCourses(term: string): Promise<CourseResponse[]> {
  const courses = await prisma.course.findMany({
    where: {
      term: term,
    },
    select: {
      pid: true,
      title: true,
      subject: true,
      code: true,
    },
    orderBy: {
      code: 'asc',
    },
  });
  return courses;
}

export async function getCoursesInSession(term: string): Promise<CourseResponse[]> {
  const courses = await prisma.$queryRaw<Pick<Course, 'id' | 'title' | 'subject' | 'code' | 'pid'>[]>`
    SELECT DISTINCT "Course".id,"Course".title,subject,code,pid FROM "Course" 
      INNER JOIN "Section" ON "Course".id = "Section"."courseId" 
      WHERE "Course".term = ${term} ORDER BY subject, code
  `;
  return courses;
}

const toCourseResponse = (course: Course): CourseDetails => ({
  ...course,
  credits: course.credits as any,
  hoursCatalog: course.hoursCatalog as any,
  preAndCorequisites: course.preAndCorequisites as any,
  preOrCorequisites: course.preOrCorequisites as any,
  subject: course.subject,
  code: course.code,
  description: course.description,
  dateStart: course.dateStart,
  formally: course.formally ? course.formally : undefined,
  pid: course.pid,
  title: course.title,
});

export async function getCourseByPid(term: string, pid: string): Promise<CourseDetails> {
  const course = await prisma.course.findFirst({
    where: {
      term: term,
      pid: pid,
    },
  });

  if (!course) throw new Error(`course not found: ${term} ${pid}`);

  return toCourseResponse(course);
}

export async function getCourseBySubjectCode(term: string, subject: string, code: string): Promise<CourseDetails> {
  const course = await prisma.course.findFirst({
    where: {
      term: term,
      subject: subject,
      code: code,
    },
  });

  if (!course) throw new Error(`course not found: ${term} ${subject} ${code}`);

  return toCourseResponse(course);
}
