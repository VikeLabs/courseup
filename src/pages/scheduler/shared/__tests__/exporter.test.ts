import * as fs from 'fs/promises';

import { courseToVEvent } from 'pages/scheduler/shared/exporter';
import { createVCalendar, createVEvent } from 'pages/scheduler/shared/ical';

describe('exporters', () => {
  describe('course to vevent', () => {
    it('should create a vevent from a course without reoccurance', () => {
      const vevent = courseToVEvent({
        subject: 'CSC',
        code: '123',
        sectionCode: 'A01',
        meetingTime: {
          dateRange: 'Sep 1, 2021 - Sep 1, 2021',
          days: 'M',
          time: '9:00 AM - 10:00 AM',
          instructors: [],
          scheduleType: '',
          type: 'Every Week',
          where: '',
        },
        term: '202109',
      });
      expect(vevent).toBe(
        createVEvent({
          uid: '202109_CSC_123_A01',
          dtstart: new Date(2021, 8, 1, 9, 0),
          dtend: new Date(2021, 8, 1, 10, 0),
          description: 'CSC 123 A01',
          summary: 'CSC 123 A01',
        })
      );
      if (!vevent) return;
      // console.log(createVCalendar(vevent));
    });
    it('should create a vevent from a course with reoccurance', async () => {
      const vevent = courseToVEvent({
        subject: 'SENG',
        code: '360',
        sectionCode: 'A01',
        meetingTime: {
          dateRange: 'Sep 8, 2021 - Dec 06, 2021',
          days: 'TWF',
          time: '11:30 AM - 12:20 PM',
          instructors: [],
          scheduleType: '',
          type: 'Every Week',
          where: 'ABC',
        },
        term: '202109',
      });
      expect(vevent).toBeDefined();
      if (!vevent) return;

      console.log(createVCalendar(vevent));
      await fs.writeFile('test.ics', createVCalendar(vevent));
      // expect(vevent).toBe(
      //   createVEvent({
      //     uid: '202109_SENG_360_A01',
      //     dtstart: new Date(2021, 8, 1, 9, 0),
      //     dtend: new Date(2021, 8, 1, 10, 0),
      //     // rrule: 'FREQ=WEEKLY;BYDAY=TU,WE,FR;UNTIL=20211206T172000Z',
      //     description: 'SENG 360 A01',
      //   })
      // );
      // if (!vevent) return;
      // console.log(createVCalendar(vevent));
    });
  });
});
