// Credits: https://github.com/FlyteWizard/UVicSchedule
// BEGIN:VCALENDAR
// VERSION:2.0
// PRODID:-//UVic Schedule//UVic Schedule to Calendar Format Script//EN
// X-WR-CALNAME:TERM Session: MONTH - MONTH YEAR
// BEGIN:VEVENT
// SUMMARY:COURSE XXX TYPE
// DTSTART;TZID=America/Vancouver;VALUE=DATE-TIME:XXXXXXXXTXXXXXX
// DTEND;TZID=America/Vancouver;VALUE=DATE-TIME:XXXXXXXXTXXXXXX
// DTSTAMP;VALUE=DATE-TIME:XXXXXXXXTXXXXXXZ
// UID:CRN-YEAR-MONTH@uvic.ca
// RRULE:FREQ=FREQUENCY;UNTIL=XXXXXXXXTXXXXXX;INTERVAL=X;BYDAY=DAY
// DESCRIPTION:Instructor: FirstName LastName\nSection: XXX\nCRN: XXXXX\nRegistr
//  ation Status: STATUS\nContact Information: EMAIL
// LOCATION:LOCATION
// END:VEVENT
// END:VCALENDAR

import { addMinutes, format } from 'date-fns';

import { CourseCalendarEvent } from 'pages/scheduler/shared/types';

const formatICAL = (date: Date) => format(date, "yyyyMMdd'T'kkmmss");
const tz = 'America/Vancouver';

export function createVEVENT(
  course: CourseCalendarEvent,
  startDatetime: Date,
  endDatetime: Date,
  durationMinutes: number,
  rrule?: string
): string {
  const instructors = `${
    course.meetingTime.instructors.length > 0 ? 'Instructor' : 'Instructors'
  }: ${course.meetingTime.instructors.join(', ')}`;

  const rruleRegex = /.*TZID=(?<TZID>.+):(?<DTSTART>.+)\n(?<RRULE>.+)UNTIL=(?<UNTIL>.+)/gm;
  const matches = rruleRegex.exec(rrule ?? '');

  const customRRule = matches?.groups?.RRULE ? `${matches?.groups?.RRULE ?? ''}UNTIL=${formatICAL(endDatetime)}` : '';

  const endDate = addMinutes(startDatetime, durationMinutes);
  return `
    BEGIN:VEVENT
    SUMMARY:${course.subject} ${course.code} ${course.sectionCode}
    DTSTART;TZID=${tz};VALUE=DATE-TIME:${formatICAL(startDatetime)}
    DTEND;TZID=${tz};VALUE=DATE-TIME:${formatICAL(endDate)}
    DTSTAMP;VALUE=DATE-TIME:${formatICAL(new Date())}Z
    ${customRRule}
    DESCRIPTION:${instructors}
    LOCATION:${course.meetingTime.where ?? 'TBA'}
    END:VEVENT
  `
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .join('\n');
}

export function CreateICal(rrule: string): string {
  const d = `
    BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//UVic Schedule//UVic Schedule to Calendar Format Script//EN
    X-WR-CALNAME:TERM Session: MONTH - MONTH YEAR
  
    END:VCALENDAR
  `;
  return d
    .split('\n')
    .map((l) => l.trim())
    .join('\n');
}
