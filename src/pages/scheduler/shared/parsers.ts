import { addMinutes, addWeeks, differenceInMinutes, parse } from 'date-fns';
import { Weekday, RRule } from 'rrule';

import { MeetingTimes } from 'lib/fetchers';

import { CourseCalendarEvent, CustomEvent } from 'pages/scheduler/shared/types';

export const buildEventsCacheKey = (event: CourseCalendarEvent) =>
  `${event.term}_${event.subject}_${event.code}_${event.sectionCode}_${event.meetingTime.days}_${event.meetingTime.time}`;
const EVENTS_CACHE: { [key: string]: ParseMeetingTimesResult } = {};

const delim = ' - ';

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

export const parseDatetimeRange = (
  meetingTime: MeetingTimes
): { start: Date; end: Date; durationMinutes: number; isSameDay: boolean } => {
  const ref = new Date();

  const parseFormat = 'MMM dd yyyy h:mm a';

  // ie. "May 05, 2021 - Jul 30, 2021"
  const startEndDates = meetingTime.dateRange.split(delim).map((d) => d.replace(',', ''));
  // ie. Array [ "10:30 am", "11:50 am" ]
  const startEndTimes = meetingTime.time.split(delim);
  // ie. Sep 08 2021 1:00 pm

  const startDatetime = parse(`${startEndDates[0]} ${startEndTimes[0]}`, parseFormat, ref);
  const diffDatetime = parse(`${startEndDates[0]} ${startEndTimes[1]}`, parseFormat, ref);

  const endDatetime = parse(`${startEndDates[1]} ${startEndTimes[1]}`, parseFormat, ref);

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

// TODO: try to move this into the backend as much as possible
export const parseMeetingTimes = (event: CourseCalendarEvent): ParseMeetingTimesResult => {
  const lowerBound = parse(event.term, 'yyyyMM', new Date());
  const parseFormat = 'MM, d, yyyy h:mm a XXX';

  // ie. "May 05, 2021 - Jul 30, 2021"
  const startEndDates = event.meetingTime.dateRange.split(delim).map((d) => d.replace(',', ''));
  // ie. Array [ "10:30 am", "11:50 am" ]
  const startEndTimes = event.meetingTime.time.split(delim);
  // ie. Sep 08 2021 1:00 pm

  // TODO: find better means of handling timezones
  const courseStartDate = new Date(startEndDates[0] + ' 00:00:00 GMT');
  const courseEndDate = new Date(startEndDates[1] + ' 00:00:00 GMT');

  // getMonth returns 0-11, so we need to add 1 to get the correct month
  const startDateString = `${lowerBound.getMonth() + 1}, 1, ${lowerBound.getUTCFullYear()}`;

  const startUpperDateRRule = parse(`${startDateString} ${startEndTimes[0]} +00:00`, parseFormat, new Date());
  const startLowerDateRRule = parse(`${startDateString} ${startEndTimes[1]} +00:00`, parseFormat, new Date());

  const days = parseMeetingTimeDays(event);

  // HACK: something doesn't like when start & end dates are the same
  // adding 1 day to the end date makes everything happy :-)
  courseEndDate.setDate(courseEndDate.getDate() + 1);

  const ruleUpper = new RRule({
    freq: RRule.WEEKLY,
    byweekday: days,
    dtstart: startUpperDateRRule,
    until: courseEndDate,
  });

  const ruleLower = new RRule({
    freq: RRule.WEEKLY,
    byweekday: days,
    dtstart: startLowerDateRRule,
    until: courseEndDate,
  });

  return {
    startDate: courseStartDate,
    endDate: courseEndDate,
    upper: ruleUpper,
    lower: ruleLower,
  };
};

export const parseMeetingTimes2 = (event: CourseCalendarEvent) => {
  const { start: startDatetime, end: endDatetime, durationMinutes, isSameDay } = parseDatetimeRange(event.meetingTime);

  const days = parseMeetingTimeDays(event);
  return {
    startDate: startDatetime,
    endDate: endDatetime,
    upper: isSameDay
      ? undefined
      : new RRule({
          // TODO: make sure freq gets set correctly based on event data
          freq: RRule.WEEKLY,
          byweekday: days,
          dtstart: startDatetime,
          until: endDatetime,
          tzid: 'America/Vancouver',
        }),
    durationMinutes,
  };
};

export const createEvent = (event: CourseCalendarEvent) => {
  const title = `${event.subject} ${event.code}`;
  // if event does not have a scheduled time, move on.
  if (event.meetingTime.time.indexOf('TBA') !== -1) return;

  const { startDate, endDate, durationMinutes, upper: rrule } = parseMeetingTimes2(event);

  if (!rrule) return;

  rrule.all().forEach((date) => {
    const start = date;
    const end = addMinutes(start, durationMinutes);

    console.log(start.toLocaleString(), end.toLocaleString());
  });
};

export const createEvents = (events: CourseCalendarEvent[]) => {
  return events.map(createEvent);
};

export const CreateCourseCalendarEvents = (courseCalendarEvents: CourseCalendarEvent[]) => {
  // TODO: add as param. default max hour
  let maxHour = 20;
  let minEventDate: Date | undefined = undefined;

  const events: CustomEvent[] = [];
  courseCalendarEvents.forEach((calendarEvent) => {
    // for caching purposes
    const key = buildEventsCacheKey(calendarEvent);

    try {
      // if event does not have a scheduled time, move on.
      if (calendarEvent.meetingTime.time.indexOf('TBA') !== -1) return;

      // check cache, if it exists, use it otherwise parse and set value in cache
      if (!EVENTS_CACHE[key]) {
        EVENTS_CACHE[key] = parseMeetingTimes(calendarEvent);
      }

      const { lower: ruleLower, upper: ruleUpper, startDate: courseStartDate } = EVENTS_CACHE[key];

      const ruleLowerAll = ruleLower.all();

      // TODO: move as much as possible into the backend
      ruleUpper.all().forEach((dateUpper, i) => {
        const title = `${calendarEvent.subject} ${calendarEvent.code}`;
        // TODO: find better means of handling timezones
        const startDate = new Date(dateUpper.toUTCString().replace('GMT', ''));
        const endDate = new Date(ruleLowerAll[i].toUTCString().replace('GMT', ''));

        const endHour = endDate.getHours();
        if (endHour >= maxHour) {
          maxHour = endHour;
        }

        const duplicateEvent = events.find(
          (event) =>
            event.title === title &&
            event.start?.getTime() === startDate.getTime() &&
            event.end?.getTime() === endDate.getTime()
        );

        if (!duplicateEvent) {
          events.push({
            title: title,
            start: startDate,
            end: endDate,
            resource: {
              color: calendarEvent.color,
              subject: calendarEvent.subject,
              code: calendarEvent.code,
              textColor: calendarEvent.textColor,
              sectionCode: calendarEvent.sectionCode,
              location: calendarEvent.meetingTime.where,
              opacity: startDate < courseStartDate,
            },
          });
        }

        if (minEventDate === undefined) {
          minEventDate = addWeeks(startDate, 1);
        } else if (startDate < minEventDate) {
          minEventDate = addWeeks(startDate, 1);
        }
      });
    } catch (error) {
      console.error(error);
    }
  });
  return {
    events,
    maxHour,
    minEventDate,
  };
};
