import { differenceInMinutes, parse } from 'date-fns';
import { Weekday, RRule } from 'rrule';

import { MeetingTimes } from 'lib/fetchers';

import { CourseCalendarEvent } from 'pages/scheduler/shared/types';

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
  const delim = ' - ';

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
  const startEndDates = event.meetingTime.dateRange.split('-').map((d) => d.replace(',', '').trim());
  // ie. Array [ "10:30 am", "11:50 am" ]
  const startEndTimes = event.meetingTime.time.split('-').map((d) => d.trim());
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
