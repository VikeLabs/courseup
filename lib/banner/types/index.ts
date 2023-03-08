// quicktype --just-types banner.json -o interface.ts

export interface Section {
  id: number;
  term: string;
  termDesc: string;
  courseReferenceNumber: string;
  partOfTerm: null | string;
  courseNumber: string;
  subject: string;
  subjectDescription: string;
  sequenceNumber: string;
  campusDescription: string;
  scheduleTypeDescription: string;
  courseTitle: string;
  creditHours: number | null;
  maximumEnrollment: number;
  enrollment: number;
  seatsAvailable: number;
  waitCapacity: number | null;
  waitCount: number;
  waitAvailable: number | null;
  crossList: null | string;
  crossListCapacity: number | null;
  crossListCount: number | null;
  crossListAvailable: number | null;
  creditHourHigh: number | null;
  creditHourLow: number;
  creditHourIndicator: string | null;
  openSection: boolean;
  linkIdentifier: string | null;
  isSectionLinked: boolean;
  subjectCourse: string;
  faculty: Faculty[];
  meetingsFaculty: MeetingsFaculty[];
  reservedSeatSummary: null;
  sectionAttributes: null;
  instructionalMethod: string | null;
  instructionalMethodDescription: string | null;
}

export interface Faculty {
  bannerId: string;
  category: null;
  //   class: FacultyClass;
  courseReferenceNumber: string;
  displayName: string;
  emailAddress: null | string;
  primaryIndicator: boolean;
  term: string;
}

export interface MeetingsFaculty {
  category: string;
  //   class: MeetingsFacultyClass;
  courseReferenceNumber: string;
  faculty: any[];
  meetingTime: MeetingTime;
  term: string;
}

export interface MeetingTime {
  beginTime: null | string;
  building: null | string;
  buildingDescription: string | null;
  campus: string | null;
  campusDescription: string | null;
  category: string;
  //   class: MeetingTimeClass;
  courseReferenceNumber: string;
  creditHourSession: number | null;
  endDate: string;
  endTime: null | string;
  friday: boolean;
  hoursWeek: number | null;
  meetingScheduleType: string;
  meetingType: string;
  meetingTypeDescription: string;
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
