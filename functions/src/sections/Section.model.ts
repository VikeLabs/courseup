import {
  ClassScheduleListing,
  DetailedClassInformation,
} from '@vikelabs/uvic-course-scraper/dist/types';

export type Section = ClassScheduleListing;

export interface Seat extends DetailedClassInformation {
  crn: string;
}

export interface CourseMapping {
  crns: string[];
}
