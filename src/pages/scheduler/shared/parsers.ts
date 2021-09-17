import { differenceInMinutes, parse } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { RRule, Weekday } from 'rrule';

import { MeetingTimes } from 'lib/fetchers';

import { CourseCalendarEvent } from 'pages/scheduler/shared/types';

const parseFormat = 'MMM dd yyyy h:mm a';

export const parseDays = (days: string) => {
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

  return daysRRule;
};

const tz = 'America/Vancouver';

export const parseDateTimeRange = (
  meetingTime: MeetingTimes
): { startDatetime: Date; endDatetime: Date; durationMinutes: number; isSameDay: boolean } => {
  const ref = new Date();

  // ie. "May 05, 2021 - Jul 30, 2021"
  const startEndDates = meetingTime.dateRange.split('-').map((d) => d.replace(',', '').trim());
  // ie. Array [ "10:30 am", "11:50 am" ]
  const startEndTimes = meetingTime.time.split('-').map((d) => d.trim());
  // ie. Sep 08 2021 1:00 pm

  const startDatetime = zonedTimeToUtc(parse(`${startEndDates[0]} ${startEndTimes[0]}`, parseFormat, ref), tz);
  const diffDatetime = zonedTimeToUtc(parse(`${startEndDates[0]} ${startEndTimes[1]}`, parseFormat, ref), tz);

  const endDatetime = zonedTimeToUtc(parse(`${startEndDates[1]} ${startEndTimes[1]}`, parseFormat, ref), tz);

  const durationMinutes = differenceInMinutes(diffDatetime, startDatetime);

  return {
    startDatetime,
    endDatetime,
    durationMinutes,
    // can't rely on meetingTime.type because even if it's only a single event, it will still say "Every Week"
    isSameDay: startEndDates[0] === startEndDates[1],
  };
};

export type ParseMeetingTimesResult = {
  lower?: RRule;
  upper?: RRule;
  startDatetime: Date;
  endDatetime: Date;
  durationMinutes: number;
};

// TODO: try to move this into the backend as much as possible
export const parseMeetingTimes = (event: CourseCalendarEvent): ParseMeetingTimesResult => {
  const { startDatetime, endDatetime, durationMinutes, isSameDay } = parseDateTimeRange(event.meetingTime);

  const days = parseDays(event.meetingTime.days);

  return {
    startDatetime,
    endDatetime,
    upper: isSameDay
      ? undefined
      : new RRule({
          // TODO: make sure freq gets set correctly based on event data
          freq: RRule.WEEKLY,
          byweekday: days,
          dtstart: startDatetime,
          until: endDatetime,
          tzid: tz,
        }),
    durationMinutes,
  };
};
