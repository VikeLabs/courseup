import { RRule, Weekday } from 'rrule';

import { MeetingTimes } from 'lib/fetchers';

import {
  clearTimezone,
  CreateEventsForCourse,
  parseDatetimeRange,
  parseMeetingTimeDays,
} from 'pages/scheduler/shared/parsers';
import { CourseCalendarEvent } from 'pages/scheduler/shared/types';

const baseBlankMeetingTime: MeetingTimes = {
  days: '',
  dateRange: '',
  time: '',
  instructors: [],
  scheduleType: '',
  type: '',
  where: '',
};

const baseCalendarEvent: CourseCalendarEvent = {
  subject: 'CSC',
  code: '111',
  sectionCode: 'A01',
  term: '202101',
  meetingTime: {
    ...baseBlankMeetingTime,
  },
};

describe('parsers', () => {
  describe('parseMeetingTimeDays', () => {
    it('parses days correctly', () => {
      const days = parseMeetingTimeDays({
        ...baseCalendarEvent,
        meetingTime: {
          ...baseBlankMeetingTime,
          days: 'MWF',
        },
      });
      expect(days).toEqual<Weekday[]>([RRule.MO, RRule.WE, RRule.FR]);
    });

    it('parses days correctly when there are no days', () => {
      const days = parseMeetingTimeDays({
        ...baseCalendarEvent,
      });
      expect(days).toEqual<Weekday[]>([]);
    });

    it('parses days correctly when there are multiple days', () => {
      const days = parseMeetingTimeDays({
        ...baseCalendarEvent,
        meetingTime: {
          ...baseBlankMeetingTime,
          days: 'MTWRF',
        },
      });

      expect(days).toEqual<Weekday[]>([RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR]);
    });
  });

  describe('parseDatetimeRange', () => {
    const meetingTime: MeetingTimes = {
      dateRange: 'Sep 08, 2021 - Dec 06, 2021',
      days: '',
      instructors: [],
      scheduleType: '',
      time: '4:30 pm - 5:20 pm',
      type: '',
      where: '',
    };

    it('parses datetime range correctly spanning tz changes', () => {
      const result = parseDatetimeRange(meetingTime);

      expect(result).toEqual({
        // 4:30 pm (PDT, daylight savings time)
        start: new Date('September 08, 2021 16:30:00 GMT'),
        // 5:20 pm (PST, standard time)
        end: new Date('December 06, 2021 17:20:00 GMT'),
        durationMinutes: 50,
        isSameDay: false,
      });
    });

    it('parses datetime range when the start/end are the same day', () => {
      const result = parseDatetimeRange({
        ...meetingTime,
        dateRange: 'Sep 08, 2021 - Sep 08, 2021',
      });

      expect(result).toEqual({
        // 4:30 pm (PDT, daylight savings time)
        start: new Date('September 08, 2021 16:30:00 GMT'),
        // 5:20 pm (PST, standard time)
        end: new Date('September 08, 2021 17:20:00 GMT'),
        durationMinutes: 50,
        isSameDay: true,
      });
    });
  });

  describe('CreateEventsForCourse', () => {
    const baseResource = {
      code: '130',
      color: undefined,
      location: 'MacLaurin Building A144',
      opacity: false,
      sectionCode: 'A01',
      subject: 'ENGR',
      textColor: undefined,
    };

    const baseMeetingTime: MeetingTimes = {
      dateRange: 'Sep 08, 2021 - Sep 08, 2021',
      days: 'MR',
      time: '9:00 am - 9:50 am',
      instructors: [],
      scheduleType: '',
      type: 'Every Week',
      where: 'MacLaurin Building A144',
    };

    const baseEvent: CourseCalendarEvent = {
      subject: 'ENGR',
      code: '130',
      sectionCode: 'A01',
      term: '202109',
      meetingTime: baseMeetingTime,
    };

    it('works for a course that only has one occurance', () => {
      const result = CreateEventsForCourse(baseEvent);
      expect(result).toBeDefined();
      // for static checks
      if (!result) return;
      const { maxHour, events } = result;
      // 1 "ghost events" and 1 class session
      expect(events.length).toEqual(2);
      expect(maxHour).toEqual(9);

      expect(events[0]).toEqual({
        title: 'ENGR 130',
        start: clearTimezone(new Date('September 1, 2021 09:00:00 GMT')),
        end: clearTimezone(new Date('September 1, 2021 09:50:00 GMT')),
        resource: {
          ...baseResource,
          // shows with opacity on the calendar
          opacity: true,
        },
      });
      expect(events[1]).toEqual({
        title: 'ENGR 130',
        start: clearTimezone(new Date('September 8, 2021 09:00:00 GMT')),
        end: clearTimezone(new Date('September 8, 2021 09:50:00 GMT')),
        resource: {
          ...baseResource,
          opacity: false,
        },
      });
    });
    it('works for a course that has multiple occurances', () => {
      const result = CreateEventsForCourse({
        ...baseEvent,
        meetingTime: {
          ...baseMeetingTime,
          type: 'Every Week',
          dateRange: 'Sep 08, 2021 - Oct 01, 2021',
          days: 'MR',
        },
      });
      expect(result).toBeDefined();
      // for static checks
      if (!result) return;
      const { events } = result;
      // 2 "ghost events" and 7 class sessions
      expect(events.length).toEqual(9);
      expect(events[0]).toEqual({
        title: 'ENGR 130',
        start: new Date('September 2, 2021 09:00:00 PDT'),
        end: new Date('September 2, 2021 09:50:00 PDT'),
        resource: {
          ...baseResource,
          opacity: true,
        },
      });
      expect(events[2]).toEqual({
        title: 'ENGR 130',
        start: new Date('September 6, 2021 09:00:00 PDT'),
        end: new Date('September 6, 2021 09:50:00 PDT'),
        resource: {
          ...baseResource,
          opacity: true,
        },
      });
      expect(events[1]).toEqual({
        title: 'ENGR 130',
        start: new Date('September 9, 2021 09:00:00 PDT'),
        end: new Date('September 9, 2021 09:50:00 PDT'),
        resource: {
          ...baseResource,
          opacity: false,
        },
      });
      expect(events[3]).toEqual({
        title: 'ENGR 130',
        start: new Date('September 13, 2021 09:00:00 PDT'),
        end: new Date('September 13, 2021 09:50:00 PDT'),
        resource: {
          ...baseResource,
          opacity: false,
        },
      });
    });
    it('works for a course that spans timezones (DST)', () => {
      const result = CreateEventsForCourse({
        ...baseEvent,
        meetingTime: {
          ...baseMeetingTime,
          dateRange: 'Sep 08, 2021 - Dec 6, 2021',
        },
      });
      expect(result).toBeDefined();
      // for static checks
      if (!result) return;
      const { maxHour, events } = result;
      // 2 "ghost events" and 28 class session
      expect(events.length).toEqual(28);
      // round 9:50 am to 10:00 am
      expect(maxHour).toEqual(10);

      expect(events[0]).toEqual({
        title: 'ENGR 130',
        start: new Date('September 2, 2021 09:00:00 PDT'),
        end: new Date('September 2, 2021 09:50:00 PDT'),
        resource: {
          ...baseResource,
          opacity: true,
        },
      });
      expect(events[2]).toEqual({
        title: 'ENGR 130',
        start: new Date('September 6, 2021 09:00:00 PDT'),
        end: new Date('September 6, 2021 09:50:00 PDT'),
        resource: {
          ...baseResource,
          opacity: true,
        },
      });
      expect(events[1]).toEqual({
        title: 'ENGR 130',
        start: new Date('September 9, 2021 09:00:00 PDT'),
        end: new Date('September 9, 2021 09:50:00 PDT'),
        resource: {
          ...baseResource,
          opacity: false,
        },
      });
      expect(events[3]).toEqual({
        title: 'ENGR 130',
        start: new Date('September 13, 2021 09:00:00 PDT'),
        end: new Date('September 13, 2021 09:50:00 PDT'),
        resource: {
          ...baseResource,
          opacity: false,
        },
      });
      expect(events[events.length - 1]).toEqual({
        title: 'ENGR 130',
        start: new Date('December 6, 2021 09:00:00 PST'),
        end: new Date('December 6, 2021 09:50:00 PST'),
        resource: {
          ...baseResource,
          opacity: false,
        },
      });
    });
  });
});
