import { MutableRefObject, useMemo, useRef, useState } from 'react';

import 'react-big-calendar/lib/sass/styles.scss';

import { addWeeks, format, getDay, parse, set, startOfWeek, addMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import { useDarkMode } from 'lib/hooks/useDarkMode';

import { CalendarEvent } from 'pages/scheduler/components/Event';
import { CalendarToolBar } from 'pages/scheduler/components/Toolbar';
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
          startDate: courseStartDate,
          endDate: courseEndDate,
          durationMinutes,
        } = parseMeetingTimes(calendarEvent);

        const title = `${calendarEvent.subject} ${calendarEvent.code}`;

        if (ruleLower) {
          // TODO: move as much as possible into the backend
          ruleLower.all().forEach((startDate) => {
            const endDate = addMinutes(startDate, durationMinutes);

            const endHour = endDate.getHours();
            if (endHour > maxHour) {
              setMaxHour(endHour + 1);
            }

            events.find(
              (event) =>
                event.title === title &&
                event.start?.getTime() === startDate.getTime() &&
                event.end?.getTime() === endDate.getTime()
            );
            console.log(startDate, endDate);

            events.push({
              title: title,
              start: startDate,
              end: endDate,
              resource: {
                color: calendarEvent.color,
                subject: calendarEvent.subject,
                code: calendarEvent.code,
                textColor: calendarEvent.textColor,
                sectionCode: calendarEvent.sectionCode,
                location: calendarEvent.meetingTime.where,
                opacity: startDate < courseStartDate,
              },
            });

            if (minEventDate.current === undefined) {
              minEventDate.current = addWeeks(startDate, 1);
            } else if (startDate < minEventDate.current) {
              minEventDate.current = addWeeks(startDate, 1);
            }
          });
        } else {
          events.push({
            title: title,
            start: courseStartDate,
            end: courseEndDate,
            resource: {
              color: calendarEvent.color,
              subject: calendarEvent.subject,
              code: calendarEvent.code,
              textColor: calendarEvent.textColor,
              sectionCode: calendarEvent.sectionCode,
              location: calendarEvent.meetingTime.where,
              opacity: false,
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    });
    setSelectedDate(computedSelectedDate);
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
