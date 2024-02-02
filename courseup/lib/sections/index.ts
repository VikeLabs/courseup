import { getCourseDescription } from '../banner';
import { Fetch } from '../banner/fetch';
import { Section } from '../banner/types';
import { getCourseIds } from '../courses';
import { prisma } from '../prisma';

import { Buildings } from './buildings';
import { formatDateRange, formatTime, meetingTimeDaysToString, parseDate, parseDateTime } from './dates';
import { Seat, Section as BannerSection } from './types';

/**
 *
 * @param fc
 * @param term
 * @param sections
 */
export async function upsertSections(fc: Fetch, term: string, sections: Section[]) {
  // store term, subject code to id mapping
  const courseIds = await getCourseIds(
    sections.map((section) => ({ subject: section.subject, code: section.courseNumber })),
    term
  );

  // console.log('courseIds', courseIds);

  // const emails = sections.flatMap((section) => section.faculty.flatMap((f) => f.emailAddress));
  // const facultyIds = await getFacultyIds(emails.filter((email) => email) as string[]);

  await Promise.all(
    sections.map(async (s) => {
      // reject non-undergraduate courses (e.g. undergraduate courses start with 1XX, 2XX, 3XX, 4XX)
      if (!s.courseNumber.match(/^[1-4][0-9]{2}\w{0,1}/)) return;

      const courseId = courseIds.get(`${s.subject}${s.courseNumber}`);

      if (!courseId) {
        console.error(`course not found: ${s.term} ${s.subject} ${s.courseNumber}`);
        return;
        // throw new Error(`course not found: ${s.term}, ${s.subject}, ${s.courseNumber}`);
      }

      const courseDescription = await getCourseDescription(fc, s.term, s.courseReferenceNumber);

      const sectionInput = {
        courseId,
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
            courseId: courseId,
            courseReferenceNumber: s.courseReferenceNumber,
          },
        },
        create: sectionInput,
        update: sectionInput,
      });

      // store faculty id in cache

      // for (const f of s.faculty) {
      //   if (!f.emailAddress) {
      //     console.error(`no email address for ${f.displayName}`);
      //     continue;
      //   }

      //   const facultyId = facultyIds.get(f.emailAddress);

      //   if (!facultyId) {
      //     const fac = {
      //       email: f.emailAddress,
      //       name: f.displayName,
      //       updatedAt: new Date(),
      //     };
      //     try {
      //       await prisma.faculty.upsert({
      //         where: {
      //           email: f.emailAddress,
      //         },
      //         create: fac,
      //         update: fac,
      //       });
      //     } catch (e) {
      //       console.error(e);
      //     }
      //   }
      // }

      // await prisma.$transaction([
      //   prisma.facultiesOnSection.deleteMany({
      //     where: {
      //       sectionId: section.id,
      //     },
      //   }),
      //   prisma.facultiesOnSection.createMany({
      //     data: s.faculty
      //       .map((f) => ({
      //         sectionId: section.id,
      //         facultyId: f.emailAddress ? facultyIds.get(f.emailAddress) : null,
      //         primary: f.primaryIndicator,
      //         updatedAt: new Date(),
      //       }))
      //       .filter((f) => f.facultyId)
      //       .map((f) => ({
      //         ...f,
      //         facultyId: f.facultyId as string,
      //       })),
      //   }),
      // ]);

      await prisma.$transaction([
        prisma.meetingTime.deleteMany({
          where: {
            sectionId: section.id,
          },
        }),
        prisma.meetingTime.createMany({
          data: s.meetingsFaculty.map(({ courseReferenceNumber, meetingTime: m }) => {
            // current date
            const now = new Date();
            const startDate = m.beginTime
              ? parseDateTime(now, m.startDate + ' ' + m.beginTime)
              : parseDate(now, m.startDate);
            const startTime = m.beginTime ? startDate : null;
            const endDate = m.endTime ? parseDateTime(now, m.endDate + ' ' + m.endTime) : parseDate(now, m.endDate);
            const endTime = m.endTime ? endDate : null;

            // check if invalid Date
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
              const err = `invalid date: ${m.startDate} ${m.endDate} ${m.beginTime} ${m.endTime}`;
              console.error(err);
              throw new Error(err);
            }

            return {
              sectionId: section.id,
              term: s.term,
              courseReferenceNumber,
              startDate: startDate,
              startTime: startTime,
              startDateTime: startTime ? startDate : null,
              endDate: endDate,
              endTime: endTime,
              endDateTime: endTime ? endDate : null,
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
            };
          }),
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

export async function getSections(term: string, subject: string, code: string): Promise<BannerSection[]> {
  const sections = await prisma.section.findMany({
    where: {
      course: {
        subject: subject.toUpperCase(),
        code: code.toUpperCase(),
        term: term,
      },
    },
    orderBy: {
      // so that the sections are in the correct order, A01, A02, A03, etc.
      sequenceNumber: 'asc',
    },
    include: {
      course: true,
      meetingTimes: true,
      capacities: {
        orderBy: {
          // order by newest
          createdAt: 'desc',
        },
        // only return the latest capacity
        take: 1,
      },
    },
  });

  return sections.map((section) => {
    // HERE'S THE BIG PROBLEM HERE WITH DATES/TIMES
    // startDate, startTime, endDate, endTime are marshalled into Date objects as UTC
    // this is the default behavior of prisma/javascript
    // but the times are stored in the database as local time (PDT/PST)
    // so when we convert them back to strings, they are off by 7/8 hours
    return {
      meetingTimes: section.meetingTimes.map((m) => ({
        type: m.meetingTypeDescription,
        time: formatTime(m),
        days: meetingTimeDaysToString(m),
        where: m.buildingDescription ? `${m.buildingDescription} ${m.room}` : 'TBA',
        dateRange: formatDateRange(m),
        scheduleType: section.scheduleTypeDescription,
        instructors: [], // TODO: get instructors
        building: m.buildingDescription ?? undefined,
        buildingAbbreviation: Buildings.get(m.buildingDescription ?? ''),
        roomNumber: m.room ?? undefined,
      })),
      registrationDates: {
        start: '',
        end: '',
      },
      instructionalMethod: section.instructionalMethodDescription ?? '',
      crn: section.courseReferenceNumber,
      associatedTerm: {
        start: '',
        end: '',
      },
      sectionCode: section.sequenceNumber,
      sectionType: section.scheduleTypeDescription.toLowerCase() as 'lecture' | 'lab' | 'tutorial',
      title: section.title,
      levels: [],
      additionalNotes: section.additionalInformation ?? undefined,
      // todo
      credits: section.creditHourLow?.toString() ?? '',
      campus: 'in-person',
      seats: {
        enrollment: section.capacities[0].enrollment,
        maxEnrollment: section.capacities[0].maximumEnrollment,
        seatsAvailable: section.capacities[0].seatsAvailable,
        waitAvailable: section.capacities[0].waitAvailable,
        waitCount: section.capacities[0].waitCount,
        waitCapacity: section.capacities[0].waitCapacity,
      },
    };
  });
}

export async function getSectionSeats(term: string, subject: string, code: string): Promise<Seat[]> {
  const sections = await prisma.section.findMany({
    where: {
      course: {
        subject: subject.toUpperCase(),
        code: code.toUpperCase(),
        term: term,
      },
    },
    include: {
      capacities: {
        orderBy: {
          // order by newest
          createdAt: 'desc',
        },
        // only return the latest capacity
        take: 1,
      },
    },
  });
  return sections.map((section) => ({
    crn: section.courseReferenceNumber,
    title: section.title,
    seats: {
      // assume that the first capacity is the latest and we only have one capacity
      actual: section.capacities[0].enrollment,
      capacity: section.capacities[0].maximumEnrollment,
      remaining: section.capacities[0].seatsAvailable,
    },
    waitListSeats: {
      actual: section.capacities[0].waitCount,
      // TODO: investigate if 0 is appropriate for waitCapacity
      capacity: section.capacities[0].waitCapacity ?? 0,
      remaining: section.capacities[0].waitAvailable ?? 0,
    },
  }));
}
