import { parse } from 'date-fns';
import { Weekday, RRule } from 'rrule';

import { CourseCalendarEvent } from 'pages/scheduler/shared/types';

const parseFormat = 'MM, d, yyyy h:mm a XXX';

const parseMeetingTimeDays = (calendarEvent: CourseCalendarEvent) => {
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

  return daysRRule;
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

  const startEndDates = event.meetingTime.dateRange.split('-').map((d) => d.replace(',', ''));
  const startEndTimes = event.meetingTime.time.split('-').map((d) => d.trim());

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
    lower: ruleLower,
    upper: ruleUpper,
  };
};
