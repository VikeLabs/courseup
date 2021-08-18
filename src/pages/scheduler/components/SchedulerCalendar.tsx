import { MutableRefObject, useMemo, useRef, useState } from 'react';

import 'react-big-calendar/lib/sass/styles.scss';

import { addWeeks, format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import { useParams } from 'react-router';
import { RRule, Weekday } from 'rrule';

import { useDarkMode } from 'lib/hooks/useDarkMode';

import { CustomEvent } from 'pages/scheduler/components/Event';
import { CustomToolBar } from 'pages/scheduler/components/Toolbar';

import { CalendarEvent } from '../shared/types';

const EVENTS_CACHE: { [key: string]: ParseMeetingTimesResult } = {};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

const parseMeetingTimeDays = (calendarEvent: CalendarEvent) => {
  const days = calendarEvent.meetingTime.days;
  const daysRRule: Weekday[] = [];

  if (days.includes('M')) {
    daysRRule.push(RRule.MO);
  }
  if (days.includes('T')) {
    daysRRule.push(RRule.TU);
  }
  if (days.includes('W')) {
    daysRRule.push(RRule.WE);
  }
  if (days.includes('R')) {
    daysRRule.push(RRule.TH);
  }
  if (days.includes('F')) {
    daysRRule.push(RRule.FR);
  }

  return daysRRule;
};

const eventPropGetter = ({ resource }: Event) => ({
  style: {
    backgroundColor: resource && resource.color,
    opacity: resource.opacity ? 0.5 : 1,
    color: 'black',
    borderRadius: 0,
    border: 'none',
    cursor: 'default',
  },
});

const slotPropGetter = (mode: <T>(light: T, dark: T) => T) => (date: Date) =>
  date.getDay() === 2 || date.getDay() === 4
    ? {
        style: {
          backgroundColor: mode('#F7F7F7', 'rgb(76, 79, 82)'),
        },
      }
    : {};

const parseFormat = 'MM, d, yyyy h:mm a XXX';

type ParseMeetingTimesResult = {
  lower: RRule;
  upper: RRule;
  startDate: Date;
  endDate: Date;
};

// TODO: try to move this into the backend as much as possible
const parseMeetingTimes = (term: string, event: CalendarEvent): ParseMeetingTimesResult => {
  const lowerBound = parse(term, 'yyyyMM', new Date());

  const startEndDates = event.meetingTime.dateRange.split('-').map((d) => d.replace(',', ''));
  const startEndTimes = event.meetingTime.time.split('-').map((d) => d.trim());

  // TODO: find better means of handling timezones
  const courseStartDate = new Date(startEndDates[0] + ' 00:00:00 GMT');
  const courseEndDate = new Date(startEndDates[1] + ' 00:00:00 GMT');

  // TODO: why is it adding +1 to the month?
  const startDateString = `${lowerBound.getMonth() + 1}, 1, ${lowerBound.getUTCFullYear()}`;

  const startUpperDateRRule = parse(`${startDateString} ${startEndTimes[0]} +00:00`, parseFormat, new Date());
  const startLowerDateRRule = parse(`${startDateString} ${startEndTimes[1]} +00:00`, parseFormat, new Date());

  const days = parseMeetingTimeDays(event);

  // HACK: something doesn't like when start & end dates are the same
  // adding 1 day to the end date makes everything happy :-)
  courseEndDate.setDate(courseEndDate.getDate() + 1);

  const ruleUpper = new RRule({
    freq: RRule.WEEKLY,
    byweekday: days,
    dtstart: startUpperDateRRule,
    until: courseEndDate,
  });

  const ruleLower = new RRule({
    freq: RRule.WEEKLY,
    byweekday: days,
    dtstart: startLowerDateRRule,
    until: courseEndDate,
  });

  return {
    startDate: courseStartDate,
    endDate: courseEndDate,
    lower: ruleLower,
    upper: ruleUpper,
  };
};

export interface SchedulerCalendarProps {
  /**
   * CalendarEvents
   * Parses events that can go into the calendar from this
   */
  calendarEvents?: CalendarEvent[];
}

export const SchedulerCalendar = ({ calendarEvents = [] }: SchedulerCalendarProps): JSX.Element => {
  const mode = useDarkMode();
  const minEventDate: MutableRefObject<Date | undefined> = useRef(undefined);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { term } = useParams();

  const today = useMemo(() => new Date(), []);

  const computedSelectedDate = useMemo(() => {
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
    const events: Event[] = [];
    calendarEvents.forEach((calendarEvent) => {
      // for caching purposes
      const key = `${term}_${calendarEvent.subject}_${calendarEvent.code}_${calendarEvent.sectionCode}`;

      try {
        // if event does not have a scheduled time, move on.
        if (calendarEvent.meetingTime.time.indexOf('TBA') !== -1) return;

        // check cache, if it exists, use it otherwise parse and set value in cache
        if (!EVENTS_CACHE[key]) {
          EVENTS_CACHE[key] = parseMeetingTimes(term, calendarEvent);
        }

        const { lower: ruleLower, upper: ruleUpper, startDate: courseStartDate } = EVENTS_CACHE[key];

        const ruleLowerAll = ruleLower.all();

        // TODO: move as much as possible into the backend
        ruleUpper.all().forEach((dateUpper, i) => {
          const title = `${calendarEvent.subject} ${calendarEvent.code}`;
          // TODO: find better means of handling timezones
          const startDate = new Date(dateUpper.toUTCString().replace('GMT', ''));
          const endDate = new Date(ruleLowerAll[i].toUTCString().replace('GMT', ''));

          const duplicateEvent = events.find(
            (event) =>
              event.title === title &&
              event.start?.getTime() === startDate.getTime() &&
              event.end?.getTime() === endDate.getTime()
          );

          if (!duplicateEvent) {
            events.push({
              title: title,
              start: startDate,
              end: endDate,
              resource: {
                color: calendarEvent.color,
                textColor: calendarEvent.textColor,
                sectionCode: calendarEvent.sectionCode,
                location: calendarEvent.meetingTime.where,
                opacity: startDate < courseStartDate,
              },
            });
          }

          if (minEventDate.current === undefined) {
            minEventDate.current = addWeeks(startDate, 1);
          } else if (startDate < minEventDate.current) {
            minEventDate.current = addWeeks(startDate, 1);
          }
        });
      } catch (error) {
        console.error(error);
      }
    });
    setSelectedDate(computedSelectedDate);
    return events;
  }, [calendarEvents, computedSelectedDate, term]);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)}
      max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20)}
      defaultView="work_week"
      views={['work_week']}
      date={selectedDate}
      eventPropGetter={eventPropGetter}
      slotPropGetter={slotPropGetter(mode)}
      components={{
        toolbar: CustomToolBar(setSelectedDate),
        event: CustomEvent,
      }}
      dayLayoutAlgorithm="no-overlap"
    />
  );
};
