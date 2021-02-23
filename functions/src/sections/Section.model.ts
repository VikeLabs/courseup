import {
  ClassScheduleListing,
  DetailedClassInformation,
} from '@isaaccormack/uvic-course-scraper/dist/src/types';

export interface Section extends ClassScheduleListing {
  crn: string;
}

export interface Seat extends DetailedClassInformation {
  crn: string;
}

export interface CourseMapping {
  crns: string[];
}
