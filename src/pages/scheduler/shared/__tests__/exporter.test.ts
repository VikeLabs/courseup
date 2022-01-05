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
          uid: '202109_CSC_123_A01_M',
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
      expect(vevent).toBe(
        createVEvent({
          uid: '202109_SENG_360_A01_TWF',
          dtstart: new Date(2021, 8, 8, 11, 30),
          dtend: new Date(2021, 8, 8, 12, 20),
          rrule: 'RRULE:FREQ=WEEKLY;BYDAY=TU,WE,FR;UNTIL=20211206T122000',
          description: 'SENG 360 A01',
          summary: 'SENG 360 A01',
          location: 'ABC',
        })
      );
    });

    it('should handle when the start date does not land a day of reoccurance', async () => {
      const vevent = courseToVEvent({
        subject: 'SENG',
        code: '360',
        sectionCode: 'A01',
        meetingTime: {
          dateRange: 'Sep 6, 2021 - Sep 15, 2021',
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
      await fs.writeFile('test2.ics', createVCalendar(vevent));
      expect(vevent).toBe(
        createVEvent({
          uid: '202109_SENG_360_A01_TWF',
          dtstart: new Date(2021, 8, 7, 11, 30),
          dtend: new Date(2021, 8, 7, 12, 20),
          rrule: 'RRULE:FREQ=WEEKLY;BYDAY=TU,WE,FR;UNTIL=20210915T122000',
          description: 'SENG 360 A01',
          summary: 'SENG 360 A01',
          location: 'ABC',
        })
      );
    });
    it('should handle when the start date does not land a day of reoccurance 2', async () => {
      const vevent = courseToVEvent({
        subject: 'ENGR',
        code: '141',
        sectionCode: 'T01',
        meetingTime: {
          dateRange: 'Jan 10, 2022 - Apr 07, 2022',
          days: 'M',
          time: '6:00 pm - 6:50 pm',
          instructors: [],
          scheduleType: '',
          type: 'Every Week',
          where: 'MacLaurin Building D010',
        },
        term: '202201',
      });
      expect(vevent).toBeDefined();
      if (!vevent) return;

      console.log(createVCalendar(vevent));
      await fs.writeFile('test2.ics', createVCalendar(vevent));
      expect(vevent).toBe(
        createVEvent({
          uid: '202201_ENGR_141_T01_M',
          dtstart: 'DTSTART;TZID=America/Vancouver:20220110T180000',
          dtend: new Date(2022, 0, 10, 18, 50),
          rrule: 'RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20220407T185000',
          description: 'ENGR 141 T01',
          summary: 'ENGR 141 T01',
          location: 'MacLaurin Building D010',
        })
      );
    });
  });
});
