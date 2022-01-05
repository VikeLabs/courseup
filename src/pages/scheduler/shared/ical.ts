import { format } from 'date-fns';

const VERSION = 'VERSION:2.0';
const PROD_ID = 'PRODID:-//courseup//courseup.vikelabs.ca//EN';

export const formatDate = (date: Date) => format(date, "yyyyMMdd'T'kkmmss");

const toDatetime = (date: Date, tz: string, attr: string) => `${attr};TZID=${tz}:${formatDate(date)}`;

type vEvent = {
  // The following are REQUIRED, but MUST NOT occur more than once.
  uid: string;
  dtstamp?: Date;
  // The following is REQUIRED if the component
  // appears in an iCalendar object that doesn't
  // specify the "METHOD" property; otherwise, it
  // is OPTIONAL; in any case, it MUST NOT occur
  // more than once.
  dtstart: Date | string;
  // The following are OPTIONAL, but MUST NOT occur more than once.
  description?: string;
  location?: string;
  organizer?: string;
  summary?: string;
  url?: string;
  // The following are OPTIONAL, but SHOULD NOT occur more than once.
  rrule?: string;
  // Either 'dtend' or 'duration' MAY appear in
  // a 'eventprop', but 'dtend' and 'duration'
  // MUST NOT occur in the same 'eventprop'.
  dtend?: Date;
  duration?: string;
  // The following are OPTIONAL,
  // and MAY occur more than once.
  categories?: string[];
};

export const createVEvent = ({
  tz = 'America/Vancouver',
  dtend,
  duration,
  uid,
  dtstamp,
  dtstart,
  description,
  location,
  organizer,
  summary,
  url,
  rrule,
  categories,
}: vEvent & { tz?: string }): string => {
  if (dtend && duration) {
    throw new Error('dtend and duration cannot be both set');
  }
  // dtend or duration must be set but not both
  if (dtend === undefined && duration === undefined) {
    throw new Error('dtend or duration must be set');
  }
  let event = ['BEGIN:VEVENT', `UID:${uid}`];

  if (dtstart && dtstart instanceof Date) {
    event.push(toDatetime(dtstamp ?? dtstart, tz, 'DTSTAMP'));
    event.push(toDatetime(dtstart, tz, 'DTSTART'));
  } else if (typeof dtstart === 'string') {
    event.push(dtstart.replace('DTSTART', 'DTSTAMP'));
    event.push(dtstart);
  }

  dtend && event.push(toDatetime(dtend, tz, 'DTEND'));
  description && event.push(`DESCRIPTION:${description}`);
  location && event.push(`LOCATION:${location}`);
  organizer && event.push(`ORGANIZER:${organizer}`);
  summary && event.push(`SUMMARY:${summary}`);
  url && event.push(`URL:${url}`);
  rrule && event.push(rrule);
  categories && event.push(`CATEGORIES:${categories.join(',')}`);

  event.push('END:VEVENT');
  return event.join('\n');
};

export const createVCalendar = (events: string) => {
  return ['BEGIN:VCALENDAR', VERSION, PROD_ID, events, 'END:VCALENDAR'].join('\n');
};
