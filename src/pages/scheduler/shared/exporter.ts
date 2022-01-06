import { addMinutes } from 'date-fns';
import { RRule } from 'rrule';

import { createVEvent, createVCalendar } from 'pages/scheduler/shared/ical';
import {
  assertMeetingTime,
  clearTimezone,
  parseDatetimeRange,
  parseMeetingTimeDays,
} from 'pages/scheduler/shared/parsers';
import { CourseCalendarEvent } from 'pages/scheduler/shared/types';

export const courseToVEvent = (course: CourseCalendarEvent): string | undefined => {
  // exit if event has no time
  if (assertMeetingTime(course.meetingTime)) return;
  // TODO: investigate potential other types
  if (course.meetingTime.type !== 'Every Week') return;
  const { start: startDatetime, end: endDatetime, isSameDay, durationMinutes } = parseDatetimeRange(course.meetingTime);
  const days = parseMeetingTimeDays(course);

  // Google Calendar doesn't like when the uid isn't actually unique
  const uid = `${course.term}_${course.subject}_${course.code}_${course.sectionCode}_${course.meetingTime.days}`;
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
    dtstart: startDatetime,
    until: endDatetime,
  });

  // this date is used because the start date of the event might land on
  // a day that is not in the rrule.
  const dtStart = clearTimezone(rrule.all()[0]);

  return createVEvent({
    uid,
    dtstart: dtStart,
    // the duration of the event is determined by the difference between the
    // start and end dates of the event.
    dtend: addMinutes(dtStart, durationMinutes),
    rrule: rrule.toString().split('\n')[1].replace('Z', ''),
    description,
    summary: description,
    location: course.meetingTime.where,
  });
};

export const coursesToVCalendar = (courses: CourseCalendarEvent[]) => {
  const vEvents = courses.flatMap((c) => {
    const vEvent = courseToVEvent(c);
    if (vEvent) return [vEvent];
    return [];
  });

  return createVCalendar(vEvents.join('\n'));
};
