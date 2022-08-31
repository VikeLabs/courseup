import { MeetingTime } from '@prisma/client';

import { prisma } from '../prisma';

import { Buildings } from './buildings';
import { Seat, Section } from './types';

// formats times of format 'HHMM' to 'HH:MM am/pm'
// required to match banner v9 and v8 data
function formatTime(time: string): string {
  let hour = Number(time.slice(0, 2));
  const minute = time.slice(2);
  const meridiem = hour >= 12 ? 'pm' : 'am';

  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${hour}:${minute} ${meridiem}`;
}

function meetingTimeDaysToString(meetingTime: MeetingTime): string {
  let days = [];
  meetingTime.monday && days.push('M');
  meetingTime.tuesday && days.push('T');
  meetingTime.wednesday && days.push('W');
  meetingTime.thursday && days.push('R');
  meetingTime.friday && days.push('F');
  meetingTime.saturday && days.push('S');

  return days.join('');
}

export async function getSections(term: string, subject: string, code: string): Promise<Section[]> {
  const sections = await prisma.section.findMany({
    where: {
      course: {
        subject: subject.toUpperCase(),
        code: code.toUpperCase(),
        term: term,
      },
    },
    include: {
      course: true,
      faculty: {
        include: {
          faculty: true,
        },
      },
      meetingTimes: true,
      capacities: {
        orderBy: {
          // order by newest
          createdAt: 'desc',
        },
        // only return the latest capacity
        take: 1,
      },
    },
  });

  return sections.map((section) => ({
    meetingTimes: section.meetingTimes.map((m) => ({
      type: m.meetingTypeDescription,
      time: m.beginTime && m.endTime ? formatTime(m.beginTime) + ' - ' + formatTime(m.endTime) : 'TBA',
      days: meetingTimeDaysToString(m),
      where: m.buildingDescription ? `${m.buildingDescription} ${m.room}` : 'TBA',
      dateRange: `${m.startDate} - ${m.endDate}`,
      scheduleType: section.scheduleTypeDescription,
      instructors: section.faculty.map((f) => f.faculty.name + `${f.primary ? ' (P)' : ''}`),
      building: m.buildingDescription ?? undefined,
      buildingAbbreviation: Buildings.get(m.buildingDescription ?? ''),
      roomNumber: m.room ?? undefined,
    })),
    registrationDates: {
      start: '',
      end: '',
    },
    instructionalMethod: section.instructionalMethodDescription ?? '',
    crn: section.courseReferenceNumber,
    associatedTerm: {
      start: '',
      end: '',
    },
    sectionCode: section.sequenceNumber,
    sectionType: section.scheduleTypeDescription.toLowerCase() as 'lecture' | 'lab' | 'tutorial',
    title: section.title,
    levels: [],
    additionalNotes: section.additionalInformation ?? undefined,
    // todo
    credits: section.creditHourLow?.toString() ?? '',
    campus: 'in-person',
    seats: {
      enrollment: section.capacities[0].enrollment,
      maxEnrollment: section.capacities[0].maximumEnrollment,
      seatsAvailable: section.capacities[0].seatsAvailable,
      waitAvailable: section.capacities[0].waitAvailable,
      waitCount: section.capacities[0].waitCount,
      waitCapacity: section.capacities[0].waitCapacity,
    },
  }));
}

export async function getSectionSeats(term: string, subject: string, code: string): Promise<Seat[]> {
  const sections = await prisma.section.findMany({
    where: {
      course: {
        subject: subject.toUpperCase(),
        code: code.toUpperCase(),
        term: term,
      },
    },
    include: {
      capacities: {
        orderBy: {
          // order by newest
          createdAt: 'desc',
        },
        // only return the latest capacity
        take: 1,
      },
    },
  });
  return sections.map((section) => ({
    crn: section.courseReferenceNumber,
    title: section.title,
    seats: {
      // assume that the first capacity is the latest and we only have one capacity
      actual: section.capacities[0].enrollment,
      capacity: section.capacities[0].maximumEnrollment,
      remaining: section.capacities[0].seatsAvailable,
    },
    waitListSeats: {
      actual: section.capacities[0].waitCount,
      // TODO: investigate if 0 is appropriate for waitCapacity
      capacity: section.capacities[0].waitCapacity ?? 0,
      remaining: section.capacities[0].waitAvailable ?? 0,
    },
  }));
}
