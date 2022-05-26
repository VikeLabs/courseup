import { addMinutes, subWeeks } from 'date-fns';
import { RRule } from 'rrule';

import {
  assertMeetingTime,
  clearTimezone,
  parseDatetimeRange,
  parseMeetingTimeDays,
  toUTC,
} from 'pages/scheduler/shared/parsers';
import { CourseCalendarEvent, CustomEvent, Resource } from 'pages/scheduler/shared/types';

const MAX_HOUR = 20;

export const courseCalEventToResource = (course: CourseCalendarEvent, opacity = false): Resource => ({
  color: course.color,
  subject: course.subject,
  code: course.code,
  textColor: course.textColor,
  dashedBorder: course.dashedBorder,
  sectionCode: course.sectionCode,
  location: course.meetingTime.where,
  locationAbbreviation: course.meetingTime.buildingAbbreviation + ' ' + course.meetingTime.roomNumber,
  opacity,
});

export const createCustomEvent = (
  title: string,
  start: Date,
  duration: number,
  course: CourseCalendarEvent,
  opacity: boolean
): CustomEvent => ({
  title,
  start: start,
  end: addMinutes(start, duration),
  resource: courseCalEventToResource(course, opacity),
});

type CalendarEventsResult = {
  events: CustomEvent[];
  maxHours: number;
  maxMinutes: number;
  minEventDate?: Date;
  rrule?: RRule;
};

export const courseCalEventToCustomEvents = (course: CourseCalendarEvent): CalendarEventsResult | undefined => {
  const title = `${course.subject} ${course.code}`;
  // exit if event has no time
  if (assertMeetingTime(course.meetingTime)) return;
  // parse meeting times
  const { start: startDatetime, end: endDatetime, durationMinutes, isSameDay } = parseDatetimeRange(course.meetingTime);
  const days = parseMeetingTimeDays(course);

  // handle case when the event is only one day long
  if (isSameDay) {
    const ghostStartDatetime = subWeeks(startDatetime, 1);
    return {
      maxHours: endDatetime.getUTCHours(),
      maxMinutes: endDatetime.getUTCMinutes(),
      events: [
        createCustomEvent(title, clearTimezone(ghostStartDatetime), durationMinutes, course, true),
        createCustomEvent(title, clearTimezone(startDatetime), durationMinutes, course, false),
      ],
    };
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

  const events: CustomEvent[] = [];

  rrule.all().forEach((date, i) => {
    if (i < days.length) {
      const ghostStartDatetime = subWeeks(date, 1);
      events.push(createCustomEvent(title, clearTimezone(ghostStartDatetime), durationMinutes, course, true));
    }

    events.push(createCustomEvent(title, clearTimezone(date), durationMinutes, course, false));
  });

  // events are not sorted by start time. ie. there will be "placeholder events" interleaved with actual events
  return {
    maxHours: endDatetime.getUTCHours(),
    maxMinutes: endDatetime.getUTCMinutes(),
    minEventDate: events[0].start ? clearTimezone(events[0].start) : undefined,
    events,
    rrule,
  };
};

export const courseCalEventsToCustomEvents = (courses: CourseCalendarEvent[]): CalendarEventsResult => {
  const events: CustomEvent[] = [];

  let maxHours = MAX_HOUR;
  let maxMinutes = 0;

  courses.forEach((course) => {
    const courseEvents = courseCalEventToCustomEvents(course);
    if (courseEvents) {
      events.push(...courseEvents.events);
      if (courseEvents.maxHours >= maxHours && courseEvents.maxMinutes >= maxMinutes) {
        maxHours = courseEvents.maxHours;
        maxMinutes = courseEvents.maxMinutes;
      }
    }
  });

  return {
    events,
    maxMinutes,
    maxHours,
  };
};
