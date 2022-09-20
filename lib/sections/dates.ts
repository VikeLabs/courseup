import { MeetingTime } from '@prisma/client';
import { format, parse } from 'date-fns';

/**
 * Transforms a collection of booleans representing days to a single string
 * @param meetingTime
 * @returns @type {string}
 */
export function meetingTimeDaysToString(meetingTime: MeetingTime): string {
  let days: string[] = [];
  meetingTime.monday && days.push('M');
  meetingTime.tuesday && days.push('T');
  meetingTime.wednesday && days.push('W');
  meetingTime.thursday && days.push('R');
  meetingTime.friday && days.push('F');
  meetingTime.saturday && days.push('S');

  return days.join('');
}

// eg. Apr 06, 2021
// the 'x' is a placeholder for the timezone.
// forcing the timezone to be UTC+0
const dateFormat = 'MMM dd, yyyy x';
export function parseDate(ref: Date, date: string): Date {
  return parse(date + ' +00', dateFormat, ref);
}

// eg. Apr 06, 2021 1420
// the 'x' is a placeholder for the timezone.
// forcing the timezone to be UTC+0
const dateTimeFormat = 'MMM dd, yyyy HHmm x';
export function parseDateTime(ref: Date, datetime: string): Date {
  return parse(datetime + ' +00', dateTimeFormat, ref);
}

const timeFormat = 'h:mm a';

export function formatDate(date: Date): string {
  return format(date, 'MMM dd, yyyy');
}

export function formatTime(m: MeetingTime): string {
  if (!m.startTime || !m.endTime) {
    return 'TBA';
  }
  const startTime = new Date(m.startTime.toISOString().replace('Z', ''));
  const endTime = new Date(m.endTime.toISOString().replace('Z', ''));

  return `${format(startTime, timeFormat)} - ${format(endTime, timeFormat)}`;
}

export function formatDateRange(m: MeetingTime): string {
  const startDate = new Date(m.startDate.toISOString().replace('Z', ''));
  const endDate = new Date(m.endDate.toISOString().replace('Z', ''));

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}
