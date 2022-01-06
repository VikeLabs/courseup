import { createVEvent, createVCalendar, formatDate } from 'pages/scheduler/shared/ical';

const date = new Date(1998, 0, 18, 23, 0);

describe('ical', () => {
  describe('formatDate', () => {
    it('should format a date correctly', () => {
      expect(formatDate(new Date(1998, 0, 18, 23, 0))).toBe('19980118T230000');
    });
  });

  describe('createVEvent', () => {
    it('throws an exception if dtend and duration are set', () => {
      expect(() =>
        createVEvent({
          dtstart: date,
          dtend: date,
          duration: 'PT1H',
          uid: '123',
        })
      ).toThrow();
    });

    it('throws an exception if dtend and duration are not set', () => {
      expect(() =>
        createVEvent({
          dtstart: date,
          uid: '123',
        })
      ).toThrow();
    });

    it('creates a basic event', () => {
      const result = createVEvent({
        uid: 'UIDXYZ',
        dtstart: date,
        dtend: date,
      });
      expect(result).toBe(
        `BEGIN:VEVENT
UID:UIDXYZ
DTSTAMP;TZID=America/Vancouver:19980118T230000
DTSTART;TZID=America/Vancouver:19980118T230000
DTEND;TZID=America/Vancouver:19980118T230000
END:VEVENT`
      );
    });

    it('creates a basic event using dtstart as a string', () => {
      const result = createVEvent({
        uid: 'UIDXYZ',
        dtstart: 'DTSTART;TZID=America/Vancouver:20220110T180000',
        dtend: new Date(2022, 0, 10, 18, 50),
      });
      expect(result).toBe(
        `BEGIN:VEVENT
UID:UIDXYZ
DTSTAMP;TZID=America/Vancouver:20220110T180000
DTSTART;TZID=America/Vancouver:20220110T180000
DTEND;TZID=America/Vancouver:20220110T185000
END:VEVENT`
      );
    });

    it('creates an event with optional properties', () => {
      const result = createVEvent({
        uid: 'UIDXYZ',
        dtstart: date,
        dtend: date,
        description: 'description',
        location: 'location',
        organizer: 'organizer',
        summary: 'summary',
        url: 'url',
        rrule: 'RRULE:XYZ',
        categories: ['cat1', 'cat2'],
      });
      expect(result).toBe(
        `BEGIN:VEVENT
UID:UIDXYZ
DTSTAMP;TZID=America/Vancouver:19980118T230000
DTSTART;TZID=America/Vancouver:19980118T230000
DTEND;TZID=America/Vancouver:19980118T230000
DESCRIPTION:description
LOCATION:location
ORGANIZER:organizer
SUMMARY:summary
URL:url
RRULE:XYZ
CATEGORIES:cat1,cat2
END:VEVENT`
      );
    });
  });

  describe('createVCalendar', () => {
    it('should create a basic calendar', () => {
      const result = createVCalendar('EVENT');
      expect(result).toBe(
        `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//courseup//courseup.vikelabs.ca//EN
EVENT
END:VCALENDAR`
      );
    });
  });
});
