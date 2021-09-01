import { Event } from 'react-big-calendar';

import { MeetingTimes, ClassScheduleListing } from 'lib/fetchers';
import { SavedCourse } from 'lib/hooks/useSavedCourses';

export interface CustomEvent extends Event {
  resource: Omit<CourseCalendarEvent, 'meetingTime' | 'term'>;
}

export type CourseCalendarEvent = {
  subject: string;
  code: string;
  meetingTime: MeetingTimes;
  sectionCode: string;
  color?: string;
  textColor?: string;
  term: string;
  location?: string;
  opacity?: boolean;
};

export type SavedCourseWithSections = SavedCourse & {
  sections: ClassScheduleListing[];
  events?: CourseCalendarEvent[];
};
