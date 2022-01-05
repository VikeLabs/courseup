import { addMinutes } from 'date-fns';
import { RRule } from 'rrule';

import { createVEvent, createVCalendar } from 'pages/scheduler/shared/ical';
import {
  assertMeetingTime,
  clearTimezone,
  parseDatetimeRange,
  parseMeetingTimeDays,
  toUTC,
} from 'pages/scheduler/shared/parsers';
import { CourseCalendarEvent } from 'pages/scheduler/shared/types';

export const courseToVEvent = (course: CourseCalendarEvent): string | undefined => {
  // exit if event has no time
  if (assertMeetingTime(course.meetingTime)) return;
  const { start: startDatetime, end: endDatetime, isSameDay, durationMinutes } = parseDatetimeRange(course.meetingTime);
  const days = parseMeetingTimeDays(course);

  const uid = `${course.term}_${course.subject}_${course.code}_${course.sectionCode}`;
  const description = `${course.subject} ${course.code} ${course.sectionCode}`;

  if (isSameDay) {
    return createVEvent({
      uid,
      dtstart: clearTimezone(startDatetime),
      dtend: clearTimezone(endDatetime),
      description,
      summary: description,
      location: course.meetingTime.where,
    });
  }

  // https://github.com/jakubroztocil/rrule#timezone-support
  const rrule = new RRule({
    // TODO: make sure freq gets set correctly based on event data
    freq: RRule.WEEKLY,
    byweekday: days,
    dtstart: toUTC(startDatetime),
    until: toUTC(endDatetime),
    tzid: 'America/Vancouver',
  });

  const dtStart = clearTimezone(rrule.all()[0]);

  return createVEvent({
    uid,
    dtstart: clearTimezone(dtStart),
    dtend: clearTimezone(addMinutes(dtStart, durationMinutes)),
    rrule: rrule.toString().split('\n')[1],
    description,
    summary: description,
    location: course.meetingTime.where,
  });
};

export const ExportCoursesToIcs = (courses: CourseCalendarEvent[]) => {
  const vEvents = courses.map(courseToVEvent).filter((e) => e !== undefined);
  if (vEvents) {
    return createVCalendar(vEvents.join('\n'));
  }
};
