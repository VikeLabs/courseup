import { MeetingTimes } from 'lib/fetchers';

import { clearTimezone } from 'pages/scheduler/shared/parsers';
import { courseCalEventToCustomEvents, courseCalEventToResource } from 'pages/scheduler/shared/transformers';
import { CourseCalendarEvent, Resource } from 'pages/scheduler/shared/types';

describe('transformers', () => {
  describe('courseCalEventToCustomEvents', () => {
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
      const result = courseCalEventToCustomEvents(baseEvent);
      expect(result).toBeDefined();
      // for static checks
      if (!result) return;
      const { maxHours, maxMinutes, events } = result;
      // 1 "ghost events" and 1 class session
      expect(events.length).toEqual(2);
      expect(maxHours).toEqual(9);
      expect(maxMinutes).toEqual(50);
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
      const result = courseCalEventToCustomEvents({
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
      const result = courseCalEventToCustomEvents({
        ...baseEvent,
        meetingTime: {
          ...baseMeetingTime,
          dateRange: 'Sep 08, 2021 - Dec 6, 2021',
        },
      });
      expect(result).toBeDefined();
      // for static checks
      if (!result) return;
      const { maxHours, maxMinutes, events } = result;
      // 2 "ghost events" and 28 class session
      expect(events.length).toEqual(28);
      // round 9:50 am to 10:00 am
      expect(maxHours).toEqual(9);
      expect(maxMinutes).toEqual(50);

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

  describe('courseCalEventToResource', () => {
    const baseResource: Resource = {
      code: '130',
      color: undefined,
      location: 'MacLaurin Building A144',
      opacity: false,
      sectionCode: 'A01',
      subject: 'ENGR',
      textColor: undefined,
      locationAbbreviation: 'MAC A144',
    };

    const baseMeetingTime: MeetingTimes = {
      dateRange: 'Sep 08, 2021 - Sep 08, 2021',
      days: 'MR',
      time: '9:00 am - 9:50 am',
      instructors: [],
      scheduleType: '',
      type: 'Every Week',
      where: 'MacLaurin Building A144',
      buildingAbbreviation: 'MAC',
      roomNumber: 'A144',
    };

    const baseEvent: CourseCalendarEvent = {
      subject: 'ENGR',
      code: '130',
      sectionCode: 'A01',
      term: '202109',
      meetingTime: baseMeetingTime,
    };

    it('should contain the correct locationAbbreviation when available', () => {
      const result = courseCalEventToResource(baseEvent);
      expect(result).toEqual(baseResource);
    });
  });
});
