import {
  ClassScheduleListing,
  DetailedClassInformation,
} from '@vikelabs/uvic-course-scraper/dist/types';

export type MeetingTimes = {
  type: string;
  time: string;
  days: string;
  where: string;
  dateRange: string;
  scheduleType: string;
  instructors: string[];
  building?: string;
  buildingAbbreviation?: string;
  roomNumber?: string;
};

export type Section = Omit<ClassScheduleListing, 'meetingTimes'> & {
  meetingTimes: MeetingTimes[];
};

export interface Seat extends DetailedClassInformation {
  crn: string;
}
