import { MeetingTimes } from 'lib/fetchers';

import { coursesToVCalendar, courseToVEvent } from 'pages/scheduler/shared/exporter';
import { createVCalendar, createVEvent } from 'pages/scheduler/shared/ical';
import { CourseCalendarEvent } from 'pages/scheduler/shared/types';

const baseMeetingTime = ({
  dateRange,
  days,
  time,
}: {
  dateRange: string;
  days: string;
  time: string;
}): MeetingTimes => ({
  dateRange,
  days,
  time,
  instructors: [],
  scheduleType: '',
  type: 'Every Week',
  where: 'ABC',
});

const baseEvent = (meetingTime: MeetingTimes): CourseCalendarEvent => ({
  subject: 'CSC',
  code: '123',
  sectionCode: 'A01',
  meetingTime,
  term: '202109',
});

describe('exporters', () => {
  describe('courseToVEvent', () => {
    it('should return undefined when a VEvent cannot be made', () => {
      const noTimeEvent = baseEvent(baseMeetingTime({ dateRange: '', days: '', time: 'TBA' }));
      expect(courseToVEvent(noTimeEvent)).toBeUndefined();
      const notEveryWeekEvent = {
        ...baseMeetingTime({ dateRange: '', days: '', time: '' }),
        type: 'Every Other Week',
      };
      expect(courseToVEvent(baseEvent(notEveryWeekEvent))).toBeUndefined();
    });

    it('should create a vevent from a course without reoccurance', () => {
      const course = baseEvent(
        baseMeetingTime({ dateRange: 'Sep 1, 2021 - Sep 1, 2021', days: 'M', time: '9:00 AM - 10:00 AM' })
      );
      const vevent = courseToVEvent(course);

      expect(vevent).toBe(
        createVEvent({
          uid: '202109_CSC_123_A01_M',
          dtstart: new Date(2021, 8, 1, 9, 0),
          dtend: new Date(2021, 8, 1, 10, 0),
          description: 'CSC 123 A01',
          summary: 'CSC 123 A01',
          location: 'ABC',
        })
      );
    });

    it('should create a vevent from a course with reoccurance', async () => {
      const course = baseEvent(
        baseMeetingTime({
          dateRange: 'Sep 8, 2021 - Dec 06, 2021',
          days: 'TWF',
          time: '11:30 AM - 12:20 PM',
        })
      );
      const vevent = courseToVEvent(course);

      expect(vevent).toBe(
        createVEvent({
          uid: '202109_CSC_123_A01_TWF',
          dtstart: new Date(2021, 8, 8, 11, 30),
          dtend: new Date(2021, 8, 8, 12, 20),
          rrule: 'RRULE:FREQ=WEEKLY;BYDAY=TU,WE,FR;UNTIL=20211206T122000',
          description: 'CSC 123 A01',
          summary: 'CSC 123 A01',
          location: 'ABC',
        })
      );
    });
    it('should handle when the start date does not land a day of recurrence', async () => {
      const course = baseEvent(
        baseMeetingTime({
          dateRange: 'Sep 6, 2021 - Sep 15, 2021',
          days: 'TWF',
          time: '11:30 AM - 12:20 PM',
        })
      );
      const vevent = courseToVEvent(course);

      expect(vevent).toBe(
        createVEvent({
          uid: '202109_CSC_123_A01_TWF',
          dtstart: new Date(2021, 8, 7, 11, 30),
          dtend: new Date(2021, 8, 7, 12, 20),
          rrule: 'RRULE:FREQ=WEEKLY;BYDAY=TU,WE,FR;UNTIL=20210915T122000',
          description: 'CSC 123 A01',
          summary: 'CSC 123 A01',
          location: 'ABC',
        })
      );
    });

    it('should handle when the start date does land a day of recurrence', async () => {
      const course = baseEvent(
        baseMeetingTime({
          dateRange: 'Jan 10, 2022 - Apr 07, 2022',
          days: 'M',
          time: '6:00 pm - 6:50 pm',
        })
      );
      const vevent = courseToVEvent(course);

      expect(vevent).toBe(
        createVEvent({
          uid: '202109_CSC_123_A01_M',
          dtstart: 'DTSTART;TZID=America/Vancouver:20220110T180000',
          dtend: new Date(2022, 0, 10, 18, 50),
          rrule: 'RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20220407T185000',
          description: 'CSC 123 A01',
          summary: 'CSC 123 A01',
          location: 'ABC',
        })
      );
    });
  });

  describe('coursesToVCalendar', () => {
    it('should create a vcalendar from an array of courses', () => {
      const vcalendar = coursesToVCalendar([
        baseEvent(
          baseMeetingTime({
            dateRange: 'Sep 1, 2021 - Sep 1, 2021',
            days: 'M',
            time: '9:00 AM - 10:00 AM',
          })
        ),
        baseEvent(
          baseMeetingTime({
            dateRange: 'Sep 1, 2021 - Sep 1, 2021',
            days: 'M',
            time: '9:00 PM - 10:00 PM',
          })
        ),
      ]);

      expect(vcalendar).toBe(
        createVCalendar(
          [
            createVEvent({
              uid: '202109_CSC_123_A01_M',
              dtstart: new Date(2021, 8, 1, 9, 0),
              dtend: new Date(2021, 8, 1, 10, 0),
              description: 'CSC 123 A01',
              summary: 'CSC 123 A01',
              location: 'ABC',
            }),
            createVEvent({
              uid: '202109_CSC_123_A01_M',
              dtstart: new Date(2021, 8, 1, 21, 0),
              dtend: new Date(2021, 8, 1, 22, 0),
              description: 'CSC 123 A01',
              summary: 'CSC 123 A01',
              location: 'ABC',
            }),
          ].join('\n')
        )
      );
    });
  });
});
