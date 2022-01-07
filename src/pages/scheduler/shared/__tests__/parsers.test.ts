import { RRule, Weekday } from 'rrule';

import { MeetingTimes } from 'lib/fetchers';

import { parseDatetimeRange, parseMeetingTimeDays } from 'pages/scheduler/shared/parsers';
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
});
