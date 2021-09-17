import { MutableRefObject, useMemo, useRef, useState } from 'react';

import 'react-big-calendar/lib/sass/styles.scss';

import { addWeeks, format, getDay, parse, set, startOfWeek, addMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import { useDarkMode } from 'lib/hooks/useDarkMode';

import { CalendarEvent } from 'pages/scheduler/components/Event';
import { CalendarToolBar } from 'pages/scheduler/components/Toolbar';
import { createVEVENT } from 'pages/scheduler/shared/ical';
import { parseMeetingTimes } from 'pages/scheduler/shared/parsers';
import { CustomEvent } from 'pages/scheduler/shared/types';
import { eventPropGetter } from 'pages/scheduler/styles/eventPropGetter';
import { slotPropGetter } from 'pages/scheduler/styles/slotPropGetter';

import { CourseCalendarEvent } from '../shared/types';

// const EVENTS_CACHE: { [key: string]: ParseMeetingTimesResult } = {};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

const createEvent = (
  { subject, code, color, textColor, sectionCode, meetingTime: { where } }: CourseCalendarEvent,
  startDate: Date,
  endDate: Date,
  opacity: boolean
): CustomEvent => ({
  title: `${subject} ${code}`,
  start: startDate,
  end: endDate,
  resource: {
    color,
    subject,
    code,
    textColor,
    sectionCode,
    location: where,
    opacity,
  },
});

export interface SchedulerCalendarProps {
  /**
   * CalendarEvents
   * Parses events that can go into the calendar from this
   */
  courseCalendarEvents?: CourseCalendarEvent[];
  term?: string;
}

export const SchedulerCalendar = ({ term, courseCalendarEvents = [] }: SchedulerCalendarProps): JSX.Element => {
  const mode = useDarkMode();
  const minEventDate: MutableRefObject<Date | undefined> = useRef(undefined);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [maxHour, setMaxHour] = useState(20);

  const today = useMemo(() => new Date(), []);

  const computedSelectedDate = useMemo<Date>(() => {
    if (term === undefined) return today;

    // eg. 202105 => 2021, 05
    const month = parseInt(term.substring(4, 6));
    const year = parseInt(term.substring(0, 4));
    // if the selected term's first month is before or during the current month
    // && the selected term's last month is after or during the current month
    // && the selected term's year is the current year
    // return today
    // else return the 2nd week (when most labs start) of the first month of the selected term
    if (month <= today.getMonth() + 1 && month + 4 >= today.getMonth() + 1 && year === today.getFullYear()) {
      return today;
    } else {
      return new Date(year, month - 1, 12);
    }
  }, [today, term]);

  const events = useMemo(() => {
    minEventDate.current = undefined;
    const events: CustomEvent[] = [];
    const iCalEvents: string[] = [];
    courseCalendarEvents.forEach((calendarEvent) => {
      // for caching purposes
      // const key = `${calendarEvent.term}_${calendarEvent.subject}_${calendarEvent.code}_${calendarEvent.sectionCode}`;
      try {
        // if event does not have a scheduled time, move on.
        if (calendarEvent.meetingTime.time.indexOf('TBA') !== -1) return;

        // check cache, if it exists, use it otherwise parse and set value in cache
        // if (!EVENTS_CACHE[key]) {
        //   EVENTS_CACHE[key] =
        // }

        const {
          upper: ruleLower,
          startDatetime: courseStartDate,
          endDatetime: courseEndDate,
          durationMinutes,
        } = parseMeetingTimes(calendarEvent);

        if (ruleLower) {
          // TODO: move as much as possible into the backend
          iCalEvents.push(
            createVEVENT(calendarEvent, courseStartDate, courseEndDate, durationMinutes, ruleLower.toString())
          );

          ruleLower.all().forEach((startDate) => {
            // HACK: rrule is broken so we have to do this
            const fixedStartDate = startDate.getTimezoneOffset() === 480 ? addMinutes(startDate, 60) : startDate;
            const endDate = addMinutes(fixedStartDate, durationMinutes);
            if (endDate.getHours() > maxHour) {
              setMaxHour(endDate.getHours() + 1);
            }

            events.push(createEvent(calendarEvent, fixedStartDate, endDate, ruleLower.options.count === 1));

            if (minEventDate.current === undefined) {
              minEventDate.current = addWeeks(fixedStartDate, 1);
            } else if (fixedStartDate < minEventDate.current) {
              minEventDate.current = addWeeks(fixedStartDate, 1);
            }
          });
        } else {
          iCalEvents.push(createVEVENT(calendarEvent, courseStartDate, courseEndDate, durationMinutes));
          events.push(createEvent(calendarEvent, courseStartDate, courseEndDate, true));
        }
      } catch (error) {
        console.error(error);
      }
    });
    setSelectedDate(computedSelectedDate);

    console.log(
      `
      BEGIN:VCALENDAR
      VERSION:2.0
      ${iCalEvents.join('\n')}
      END:VCALENDAR
      `
        .split('\n')
        .map((l) => l.trim())
        .join('\n')
    );

    return events;
  }, [courseCalendarEvents, computedSelectedDate, maxHour]);

  return (
    <Calendar<CustomEvent>
      localizer={localizer}
      events={events}
      min={set(today, { hours: 8, minutes: 0 })}
      max={set(today, { hours: maxHour, minutes: 0 })}
      defaultView="work_week"
      views={['work_week']}
      date={selectedDate}
      eventPropGetter={eventPropGetter}
      slotPropGetter={slotPropGetter(mode)}
      components={{
        toolbar: CalendarToolBar(setSelectedDate),
        event: CalendarEvent,
      }}
      dayLayoutAlgorithm="no-overlap"
    />
  );
};
