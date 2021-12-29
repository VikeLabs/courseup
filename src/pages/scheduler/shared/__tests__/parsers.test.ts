import { RRule, Weekday } from 'rrule';

import { MeetingTimes } from 'lib/fetchers';

import {
  parseDatetimeRange,
  parseMeetingTimeDays,
  parseMeetingTimes,
  ParseMeetingTimesResult,
} from 'pages/scheduler/shared/parsers';
import { CourseCalendarEvent } from 'pages/scheduler/shared/types';

const baseMeetingTime: MeetingTimes = {
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
    ...baseMeetingTime,
  },
};

describe('parsers', () => {
  describe('parseMeetingTimeDays', () => {
    it('parses days correctly', () => {
      const days = parseMeetingTimeDays({
        ...baseCalendarEvent,
        meetingTime: {
          ...baseMeetingTime,
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
          ...baseMeetingTime,
          days: 'MTWRF',
        },
      });

      expect(days).toEqual<Weekday[]>([RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR]);
    });
  });

  describe('parseMeetingTimes', () => {
    it('parses meeting times correctly', () => {
      // https://www.uvic.ca/BAN1P/bwckctlg.p_disp_listcrse?term_in=202109&subj_in=SENG&crse_in=360&schd_in=
      const parsedMeetingTimes = parseMeetingTimes({
        subject: 'SENG',
        code: '360',
        sectionCode: 'A01',
        term: '202109',
        meetingTime: {
          dateRange: 'Sep 08, 2021 - Dec 06, 2021',
          days: 'TWF',
          instructors: [],
          scheduleType: '',
          time: '4:30 pm - 5:20 pm',
          type: 'Every Week',
          where: 'MacLaurin Building A144',
        },
      });

      const startDate = new Date('September 08, 2021 00:00:00 GMT');
      const endDate = new Date('December 07, 2021 00:00:00 GMT');
      const freq = RRule.WEEKLY;
      const byweekday = [RRule.TU, RRule.WE, RRule.FR];

      expect(parsedMeetingTimes).toEqual<ParseMeetingTimesResult>({
        startDate,
        endDate: new Date('December 07, 2021 00:00:00 GMT'),
        // TODO: rename
        upper: new RRule({
          freq,
          byweekday,
          dtstart: new Date('September 01, 2021 16:30:00 GMT'),
          until: endDate,
        }),
        // TODO: rename
        lower: new RRule({
          freq,
          byweekday,
          dtstart: new Date('September 01, 2021 17:20:00 GMT'),
          until: endDate,
        }),
      });
    });
  });

  describe('parseDatetimeRange', () => {
    it('parses datetime range correctly', () => {
      const result = parseDatetimeRange({
        dateRange: 'Sep 08, 2021 - Dec 06, 2021',
        days: 'TWF',
        instructors: [],
        scheduleType: '',
        time: '4:30 pm - 5:20 pm',
        type: 'Every Week',
        where: 'MacLaurin Building A144',
      });
      expect(result).toEqual({
        // why???
        start: new Date('September 08, 2021 23:30:00 GMT'),
        end: new Date('December 07, 2021 01:20:00 GMT'),
        durationMinutes: 50,
        isSameDay: false,
      });
    });
  });
});
