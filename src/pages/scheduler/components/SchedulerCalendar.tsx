import { useEffect, useMemo, useState } from 'react';

import 'react-big-calendar/lib/sass/styles.scss';

import { format, getDay, parse, set, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import { useDarkMode } from 'lib/hooks/useDarkMode';

import { CalendarEvent } from 'pages/scheduler/components/Event';
import { CalendarToolBar } from 'pages/scheduler/components/Toolbar';
import { useInitialDateTime } from 'pages/scheduler/hooks/useInitialDatetime';
import { coursesToVCalendar } from 'pages/scheduler/shared/exporter';
import { CreateEventsFromCourses } from 'pages/scheduler/shared/parsers';
import { CustomEvent } from 'pages/scheduler/shared/types';
import { eventPropGetter } from 'pages/scheduler/styles/eventPropGetter';
import { slotPropGetter } from 'pages/scheduler/styles/slotPropGetter';

import { CourseCalendarEvent } from '../shared/types';

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
  // for darkmode
  const mode = useDarkMode();
  const today = useMemo(() => new Date(), []);
  // initialize selected date
  const [selectedDate, setSelectedDate] = useState(today);
  // determine what date to position the calendar on.
  const initialSelectedDate = useInitialDateTime(term);
  // for iCalendar export
  // determines the max hour to display on the calendar. defaults to 8 pm
  const [maxHour, setMaxHour] = useState(20);
  // create events compatible with the calendar from courses
  const vCalendar = useMemo(() => {
    return courseCalendarEvents.length !== 0 ? coursesToVCalendar(courseCalendarEvents) : undefined;
  }, [courseCalendarEvents]);

  const events = useMemo(() => {
    const { events, maxHour: tmpMaxHour } = CreateEventsFromCourses(courseCalendarEvents);

    if (tmpMaxHour > maxHour) {
      setMaxHour(tmpMaxHour);
    }
    return events;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseCalendarEvents]);

  useEffect(() => {
    setSelectedDate(initialSelectedDate);
  }, [initialSelectedDate, courseCalendarEvents.length]);

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
        toolbar: CalendarToolBar(setSelectedDate, vCalendar),
        event: CalendarEvent,
      }}
      dayLayoutAlgorithm="no-overlap"
    />
  );
};
