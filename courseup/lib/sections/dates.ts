import { MeetingTime } from '@prisma/client';
import { format, parse } from 'date-fns';

const resetDate = (date: Date): Date => new Date(date.toISOString().replace('Z', ''));

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
const dateFormatFallback = 'MM/dd/yyyy X'; // Format for dates coming from banner
export function parseDate(ref: Date, date: string): Date {
  const parsed = parse(date + ' +00', dateFormat, ref);
  return !isNaN(parsed.getTime()) ? parsed : parse(date + ' +00', dateFormatFallback, ref);
}

// eg. Apr 06, 2021 1420
// the 'x' is a placeholder for the timezone.
// forcing the timezone to be UTC+0
const dateTimeFormat = 'MMM dd, yyyy HHmm x';
const dateTimeFormatFallback = 'MM/dd/yyyy HHmm X'; // Format for datetimes coming from banner
export function parseDateTime(ref: Date, datetime: string): Date {
  const parsed = parse(datetime + ' +00', dateTimeFormat, ref);
  return !isNaN(parsed.getTime()) ? parsed : parse(datetime + ' +00', dateTimeFormatFallback, ref);
}

const timeFormat = 'h:mm a';

export function formatDate(date: Date): string {
  return format(date, 'MMM dd, yyyy');
}

export function formatTime(m: MeetingTime): string {
  if (!m.startTime || !m.endTime) {
    return 'TBA';
  }
  const startTime = resetDate(m.startTime);
  const endTime = resetDate(m.endTime);

  return `${format(startTime, timeFormat)} - ${format(endTime, timeFormat)}`;
}

export function formatDateRange(m: MeetingTime): string {
  const startDate = resetDate(m.startDate);
  const endDate = resetDate(m.endDate);

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}
