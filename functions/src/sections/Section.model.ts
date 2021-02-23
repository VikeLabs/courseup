import {
  ClassScheduleListing,
  DetailedClassInformation,
} from '@vikelabs/uvic-course-scraper/dist/types';

export interface Section extends ClassScheduleListing {
  crn: string;
}

export interface Seat extends DetailedClassInformation {
  crn: string;
}

export interface CourseMapping {
  crns: string[];
}
