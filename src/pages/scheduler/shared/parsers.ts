import { differenceInMinutes, parse } from 'date-fns';
import { RRule, Weekday } from 'rrule';

import { MeetingTimes } from 'lib/fetchers';

import { CourseCalendarEvent } from 'pages/scheduler/shared/types';

const parseFormat = 'MMM dd yyyy h:mm a X';

export const parseMeetingTimeDays = ({ meetingTime }: CourseCalendarEvent) => {
  const days = meetingTime.days;
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

const parseDatetimeRange = (
  meetingTime: MeetingTimes
): { start: Date; end: Date; durationMinutes: number; isSameDay: boolean } => {
  const ref = new Date();

  // ie. "May 05, 2021 - Jul 30, 2021"
  const startEndDates = meetingTime.dateRange.split('-').map((d) => d.replace(',', '').trim());
  // ie. Array [ "10:30 am", "11:50 am" ]
  const startEndTimes = meetingTime.time.split('-').map((d) => d.trim());
  // ie. Sep 08 2021 1:00 pm

  // -07 GMT for Victoria, B.C.
  const startDatetime = parse(`${startEndDates[0]} ${startEndTimes[0]} -07`, parseFormat, ref);
  const diffDatetime = parse(`${startEndDates[0]} ${startEndTimes[1]} -07`, parseFormat, ref);

  const endDatetime = parse(`${startEndDates[1]} ${startEndTimes[1]} -07`, parseFormat, ref);

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
  lower?: RRule;
  upper?: RRule;
  startDate: Date;
  endDate: Date;
  durationMinutes: number;
};

// TODO: try to move this into the backend as much as possible
export const parseMeetingTimes = (event: CourseCalendarEvent): ParseMeetingTimesResult => {
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
