import { addMinutes, differenceInMinutes, parse, subWeeks } from 'date-fns';
import { Weekday, RRule } from 'rrule';

import { MeetingTimes } from 'lib/fetchers';

import { CourseCalendarEvent, CustomEvent, Resource } from 'pages/scheduler/shared/types';

const DELIM = ' - ';
const EVENTS_CACHE: { [key: string]: ParseMeetingTimesResult } = {};
const MAX_HOUR = 20;

export const toUTC = (date: Date) =>
  new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes())
  );

export const clearTimezone = (date: Date) => new Date(date.toUTCString().replace('GMT', ''));

export const assertMeetingTime = (meetingTime: MeetingTimes) => {
  return meetingTime.time.indexOf('TBA') !== -1;
};

export const buildEventsCacheKey = (event: CourseCalendarEvent) =>
  `${event.term}_${event.subject}_${event.code}_${event.sectionCode}_${event.meetingTime.days}_${event.meetingTime.time}`;

export const parseMeetingTimeDays = (calendarEvent: CourseCalendarEvent) => {
  const days = calendarEvent.meetingTime.days;
  const daysRRule: Weekday[] = [];

  if (days.includes('M')) {
    daysRRule.push(RRule.MO);
  }
  if (days.includes('T')) {
    daysRRule.push(RRule.TU);
  }
  if (days.includes('W')) {
    daysRRule.push(RRule.WE);
  }
  if (days.includes('R')) {
    daysRRule.push(RRule.TH);
  }
  if (days.includes('F')) {
    daysRRule.push(RRule.FR);
  }

  // days are in order of M to F always
  return daysRRule;
};

export type ParseDatetimeRangeResult = {
  // start and end are stored in UTC but are not actually accurate as UTC.
  start: Date;
  end: Date;
  durationMinutes: number;
  isSameDay: boolean;
};

export const parseDatetimeRange = (meetingTime: MeetingTimes): ParseDatetimeRangeResult => {
  // defines values missing from the parsed dateString
  const ref = new Date();

  // parse as UTC time (GMT +00)
  const parseFormat = 'MMM dd yyyy h:mm a x';
  // parses the dateString into a Date object using system timezone.

  // ie. "May 05, 2021 - Jul 30, 2021"
  const startEndDates = meetingTime.dateRange.split(DELIM).map((d) => d.replace(',', ''));
  // ie. Array [ "10:30 am", "11:50 am" ]
  const startEndTimes = meetingTime.time.split(DELIM);
  // ie. Sep 08 2021 1:00 pm

  // parse as GMT
  const startDatetime = parse(`${startEndDates[0]} ${startEndTimes[0]} +00`, parseFormat, ref);
  // for calculating the duration of event in minutes
  const diffDatetime = parse(`${startEndDates[0]} ${startEndTimes[1]} +00`, parseFormat, ref);

  const endDatetime = parse(`${startEndDates[1]} ${startEndTimes[1]} +00`, parseFormat, ref);

  const durationMinutes = differenceInMinutes(diffDatetime, startDatetime);

  return {
    start: startDatetime,
    end: endDatetime,
    durationMinutes,
    // can't rely on meetingTime.type because even if it's only a single event, it will still say "Every Week"
    isSameDay: startEndDates[0] === startEndDates[1],
  };
};

export type ParseMeetingTimesResult = {
  lower: RRule;
  upper: RRule;
  startDate: Date;
  endDate: Date;
};

export const CourseEventToResource = (course: CourseCalendarEvent, opacity = false): Resource => ({
  color: course.color,
  subject: course.subject,
  code: course.code,
  textColor: course.textColor,
  sectionCode: course.sectionCode,
  location: course.meetingTime.where,
  opacity,
});

export const CreateCustomEvent = (
  title: string,
  start: Date,
  duration: number,
  course: CourseCalendarEvent,
  opacity: boolean
): CustomEvent => ({
  title,
  start: start,
  end: addMinutes(start, duration),
  resource: CourseEventToResource(course, opacity),
});

type CalendarEventsResult = {
  events: CustomEvent[];
  maxHour: number;
  minEventDate?: Date;
  rrule?: RRule;
};

export const CreateEventsForCourse = (course: CourseCalendarEvent): CalendarEventsResult | undefined => {
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
      maxHour: endDatetime.getUTCHours(),
      events: [
        CreateCustomEvent(title, clearTimezone(ghostStartDatetime), durationMinutes, course, true),
        CreateCustomEvent(title, clearTimezone(startDatetime), durationMinutes, course, false),
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
      events.push(CreateCustomEvent(title, clearTimezone(ghostStartDatetime), durationMinutes, course, true));
    }

    events.push(CreateCustomEvent(title, clearTimezone(date), durationMinutes, course, false));
  });
  // get nearest hour from hour and minutes to determine max hour
  const maxHour = Math.ceil(endDatetime.getUTCHours() / 2) * 2;

  // events are not sorted by start time. ie. there will be "placeholder events" interleaved with actual events
  return {
    maxHour,
    minEventDate: events[0].start ? clearTimezone(events[0].start) : undefined,
    events,
    rrule,
  };
};

export const CreateEventsFromCourses = (courses: CourseCalendarEvent[]): CalendarEventsResult => {
  const events: CustomEvent[] = [];

  let maxHour = MAX_HOUR;

  courses.forEach((course) => {
    const courseEvents = CreateEventsForCourse(course);
    if (courseEvents) {
      events.push(...courseEvents.events);
      if (courseEvents.maxHour > maxHour) {
        maxHour = courseEvents.maxHour;
      }
    }
  });

  return {
    events,
    maxHour,
  };
};
