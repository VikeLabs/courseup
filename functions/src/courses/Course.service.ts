import { Course, CourseDetails } from './Course.model';
import {
  ClassScheduleListing,
  UVicCourseScraper,
} from '@vikelabs/uvic-course-scraper/dist/index';
import { subjectCodeExtractor } from '../shared/subjectCodeExtractor';
import { Term } from '../constants';
import { query, where, batch, ref, get, update, set } from 'typesaurus';
import {
  CourseDoc,
  CoursesCollection,
  SectionsSubstore,
} from '../db/collections';
import { getSections } from '../sections/Section.service';
import { mapLimit } from 'async';

export interface BannerApiResponse {
  success: boolean;
  totalCount: number;
  data: Class[];
  pageOffset: number;
  pageMaxSize: number;
  sectionsFetchedCount: number;
  pathMode: string;
  searchResultsConfigs: null;
  ztcEncodedImage: null;
  allowHoldRegistration: null;
}

export interface Class {
  id: number;
  term: string;
  termDesc: string;
  courseReferenceNumber: string;
  partOfTerm: string;
  courseNumber: string;
  subject: string;
  subjectDescription: string;
  sequenceNumber: string;
  campusDescription: "Main" | "Off Campus" | "Online" | "Victoria, BC";
  scheduleTypeDescription: "Gradable Lab" | "Lab" | "Lecture" | "Lecture Topic" | "Tutorial";
  courseTitle: string;
  creditHours: number | null;
  maximumEnrollment: number;
  enrollment: number;
  seatsAvailable: number;
  waitCapacity: number;
  waitCount: number;
  waitAvailable: number;
  crossList: null;
  crossListCapacity: null;
  crossListCount: null;
  crossListAvailable: null;
  creditHourHigh: number | null;
  creditHourLow: number;
  creditHourIndicator: "OR" | "TO" | null;
  openSection: boolean;
  linkIdentifier: null | string;
  isSectionLinked: boolean;
  subjectCourse: string;
  faculty: Faculty[];
  meetingsFaculty: MeetingsFaculty[];
  reservedSeatSummary: null;
  sectionAttributes: null;
  instructionalMethod: "F2F" | "OL";
  instructionalMethodDescription: "Face-to-face" | "Fully Online";
}

export interface Faculty {
  bannerId: string;
  category: null;
  class: string;
  courseReferenceNumber: string;
  displayName: string;
  emailAddress: string;
  primaryIndicator: boolean;
  term: string;
}

export interface MeetingsFaculty {
  category: string;
  class: string;
  courseReferenceNumber: string;
  faculty: any[];
  meetingTime: MeetingTime;
  term: string;
}

export interface MeetingTime {
  beginTime: null | string;
  building: null | string;
  buildingDescription: null | string;
  campus: "M" | null;
  campusDescription: "Main" | "Off Campus" | "Online" | "Victoria, BC" | null;
  category: string;
  class: string;
  courseReferenceNumber: string;
  creditHourSession: number;
  endDate: string;
  endTime: null | string;
  friday: boolean;
  hoursWeek: number;
  meetingScheduleType: "GLB" | "L01" | "LAB" | "LEC" | "TUT";
  meetingType: "CLAS";
  meetingTypeDescription: "Every Week",
  monday: boolean;
  room: null | string;
  saturday: boolean;
  startDate: string;
  sunday: boolean;
  term: string;
  thursday: boolean;
  tuesday: boolean;
  wednesday: boolean;
}

type Section = {
  subject: string;
  code: string;
  title: string;
  pid: string;
  sections: ClassScheduleListing[];
};

export class CoursesService {
  /**
   *
   * @param term ie. 202101
   * @param inSessionOnly if true, will only return courses that are in session.
   * @returns Promise<Course[]>
   */
  static async getCourses(
    term: Term,
    inSessionOnly = false
  ): Promise<Course[]> {
    // only return courses that are in session for the given term.
    if (inSessionOnly) {
      // only return courses
      const results = await query(CoursesCollection, [
        where('inSession', '==', true),
        where('term', '==', term),
      ]);

      return results.map(({ data: { subject, code, title, pid } }) => ({
        subject,
        code,
        pid,
        title,
      }));
    }

    const { response: courses } = await UVicCourseScraper.getCourses(term);

    return courses.map((course) => ({
      ...subjectCodeExtractor(course),
      pid: course.pid,
      title: course.title,
    }));
  }

  static async getCourseDetails(
    term: string,
    subject: string,
    code: string
  ): Promise<CourseDetails> {
    const details = await getCourse(term, subject.toUpperCase(), code);

    // TODO: make better?
    if (!details) throw new Error('pid Not Found');

    const { pid } = details;

    return this.getCourseDetailsByPid(term, pid);
  }

  static async getCourseDetailsByPid(
    term: string,
    pid: string
  ): Promise<CourseDetails> {
    const { response: course } = await UVicCourseScraper.getCourseDetailsByPid(
      term,
      pid
    );

    return {
      ...subjectCodeExtractor(course),
      dateStart: course.dateStart,
      pid: course.pid,
      title: course.title,
      description: course.description,
      credits: course.credits,
      hoursCatalog: course.hoursCatalog,
      preAndCorequisites: course.preAndCorequisites,
      preOrCorequisites: course.preOrCorequisites,
    };
  }

  /**
   * Populates the database with course information required to make advanced queries and
   * fast requests to sub-resources (like sections, seats), which require a CRN.
   * NOTE: the assumption is this won't be run very often.
   * @param term
   */
  static async populateCourses(term: Term, cookie: string): Promise<void> {
    // get all sections for a given term and course
    console.log('Fetching sections...');

    const querySize = 2; // Set to arbitrarily large number (5 digits) to get all sections
    const resp = await fetch(`https://banner.uvic.ca/StudentRegistrationSsb/ssb/searchResults/searchResults?txt_term=${term}&pageMaxSize=${querySize}&sortColumn=subjectDescription&sortDirection=asc`, {
      headers: {
        'Accept': 'application/json',
        'Cookie': `JSESSIONID=${cookie}`,
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });

    await fetch("https://banner.uvic.ca/StudentRegistrationSsb/logoff", {
      "credentials": "include",
      headers: {
        "Accept": "text/html",
        'Cookie': `JSESSIONID=${cookie}`,
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
      }
    });
    console.log(`Logout status: ${resp.status}`)

    const jsn = await resp.json() as BannerApiResponse
    if (!jsn || jsn.success == false || !jsn.data || jsn.data.length == 0)
      throw Error(`Banner API request failed: ${JSON.stringify(jsn)}`);


    console.log(JSON.stringify(jsn))

    /*
    const sections: Section[] = {};

    console.log(
      `Inserting ${sections.length} records as batch operation into Firestore...`
    );

    let j = 0;
    let { set, commit } = batch();
    for (let i = 0; i < sections.length; i++) {
      // Each batch can be up to 500 set, update and remove operations
      const course = sections[i];
      const { subject, code, title, pid } = course;

      const crns = course.sections.map((c) => c.crn);

      set(CoursesCollection, constructSectionKey(term, subject, code), {
        term,
        pid,
        title,
        subject,
        code,
        crns,
        inSession: crns.length > 0 ? true : false,
        createdAt: new Date(Date.now()),
      });
      j++;

      const id = constructSectionKey(term, subject, code);
      const courseRef = ref(CoursesCollection, id);

      // insert into data into subcollection
      course.sections.map(async ({ crn }) => {
        return set(SectionsSubstore(id), crn, {
          course: courseRef,
          crn,
        });
      });

      j += course.sections.length;
      // 450 is a "soft" limit on how many write operations that can be batched together.
      // since the sections we can't really gauge, it's simpler to set a safer upper bound.
      // this code will only fail if the num of sections in a given class is greater than 50.

      if (j > 450) {
        console.log(`Inserted ${j} records...`);
        await commit();
        // FIX: this is a workaround for an "weird" bug.
        // the set/commit need to be re-created from batch() to "flush" the batch writes.
        // https://stackoverflow.com/questions/61666244/invalid-argument-maximum-500-writes-allowed-per-request-firebase-cloud-functi
        const { set: a, commit: b } = batch();
        set = a;
        commit = b;
        j = 0;
      }
    }
    console.log(`Flushing remaining courses...`);
    await commit();
    */
  }
}

export async function getCourse(
  term: string,
  subject: string,
  code: string
): Promise<CourseDoc | undefined> {
  const doc = await get(
    CoursesCollection,
    constructSectionKey(term, subject, code)
  );
  return doc?.data;
}

export async function setCourse(
  term: string,
  subject: string,
  code: string
): Promise<CourseDoc | undefined> {
  const { response: courses } = await UVicCourseScraper.getCourses(term);

  const key = constructSectionKey(term, subject, code);

  // we need the pid so this is currently the "best" (or only way) to get it if we don't have a record in the database.
  const course = courses.find((c) => `${term}${c.subjectCode}` === key);

  if (!course) return undefined;

  const { response: sections } = await UVicCourseScraper.getCourseSections(
    term,
    subject,
    code
  );

  const crns = sections.map((c) => c.crn);

  const doc = {
    subject,
    code,
    title: course.title,
    pid: course.pid,
    term,
    crns,
    inSession: crns.length > 0 ? true : false,
    createdAt: new Date(Date.now()),
  };

  await set(CoursesCollection, key, doc);
  return doc;
}

export async function updateCourse(
  term: string,
  subject: string,
  code: string
): Promise<void> {
  try {
    const { response: sections } = await UVicCourseScraper.getCourseSections(
      term,
      subject,
      code
    );

    if (sections.length > 0) {
      const crns = sections.map(({ crn }) => crn);
      const retrievedAt = new Date(Date.now());
      await update(
        CoursesCollection,
        constructSectionKey(term, subject, code),
        {
          crns,
          inSession: crns.length > 0 ? true : false,
          updatedAt: retrievedAt,
        }
      );
    }
  } catch (e) {
    console.warn(e);
  }
}

export function constructSectionKey(
  term: string,
  subject: string,
  code: string
): string {
  return `${term}${subject}${code}`;
}
