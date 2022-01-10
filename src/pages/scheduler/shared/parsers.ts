import { differenceInMinutes, parse } from 'date-fns';
import { Weekday, RRule } from 'rrule';

import { MeetingTimes } from 'lib/fetchers';

import { CourseCalendarEvent } from 'pages/scheduler/shared/types';

const DELIM = ' - ';

export const toUTC = (date: Date) =>
  new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes())
  );

export const clearTimezone = (date: Date) => new Date(date.toUTCString().replace('GMT', ''));

export const assertMeetingTime = (meetingTime: MeetingTimes) => {
  return meetingTime.time.indexOf('TBA') !== -1;
};

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
