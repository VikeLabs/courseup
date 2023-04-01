import { Event } from 'react-big-calendar';

import { MeetingTimes, Section } from 'lib/fetchers';
import { SavedCourse } from 'lib/hooks/useSavedCourses';

export type Resource = Omit<CourseCalendarEvent, 'meetingTime' | 'term'>;

export interface CustomEvent extends Event {
  resource: Resource;
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
  locationAbbreviation?: string;
  opacity?: boolean;
  dashedBorder?: boolean;
};

export type SavedCourseWithSections = SavedCourse & {
  sections: Section[];
  events?: CourseCalendarEvent[];
};
