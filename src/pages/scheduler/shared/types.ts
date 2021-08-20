import { MeetingTimes, ClassScheduleListing } from 'lib/fetchers';
import { SavedCourse } from 'lib/hooks/useSavedCourses';

export type CourseCalendarEvent = {
  subject: string;
  code: string;
  meetingTime: MeetingTimes;
  sectionCode: string;
  color?: string;
  textColor?: string;
  term: string;
};

export type SavedCourseWithSections = SavedCourse & {
  sections: ClassScheduleListing[];
  events?: CourseCalendarEvent[];
};
