import {
  ClassScheduleListing,
  DetailedClassInformation,
  MeetingTimes as MeetingTimesType,
} from '@vikelabs/uvic-course-scraper/dist/types';

export type MeetingTimes = MeetingTimesType & {
  building?: string;
  buildingAccronym?: string;
  roomNumber?: string;
};

export type Section = ClassScheduleListing & {
  meetingTimes: MeetingTimes[];
};

export interface Seat extends DetailedClassInformation {
  crn: string;
}
