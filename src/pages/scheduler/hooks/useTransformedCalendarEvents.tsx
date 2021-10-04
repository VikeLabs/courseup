import { CourseCalendarEvent, SavedCourseWithSections } from 'pages/scheduler/shared/types';

// denormalizes the calendar events from the saved courses
export const denormalizeCourseEvents = (courses: SavedCourseWithSections[]): CourseCalendarEvent[] => {
  const events: CourseCalendarEvent[] = [];
  courses
    .filter((c) => !!c.selected)
    .forEach((course) => {
      for (const sectionType of [course.lecture, course.lab, course.tutorial]) {
        if (!sectionType) continue;
        const section = course.sections.find((s) => s.sectionCode === sectionType);
        if (section) {
          events.push(
            ...section.meetingTimes.map((meetingTime) => ({
              subject: course.subject,
              code: course.code,
              meetingTime: meetingTime,
              sectionCode: sectionType,
              color: course.color ?? 'blue',
              textColor: 'black',
              term: course.term,
            }))
          );
        }
      }
    });

  return events;
};
