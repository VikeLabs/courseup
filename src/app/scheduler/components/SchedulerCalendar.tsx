import { Box } from '@chakra-ui/layout';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import moment from 'moment';
import { useMemo } from 'react';
import 'react-big-calendar/lib/sass/styles.scss';
import { Calendar, momentLocalizer, Event, EventProps } from 'react-big-calendar';
import { RRule } from 'rrule';

import { CalendarEvent } from './CalendarEvent';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const localizer = momentLocalizer(moment);

const eventStyleGetter = ({ resource }: Event) => {
  var style = {
    backgroundColor: resource && resource.color,
    borderRadius: '0px',
    opacity: 0.8,
    color: 'black',
    border: '0px',
    display: 'block',
  };
  return {
    style: style,
  };
};

const CustomEvent = ({ title, event }: EventProps) => {
  return (
    <span>
      {title}, {event.resource && event.resource.sectionCode}, {event.resource && event.resource.location}
    </span>
  );
};

export interface CalendarProps {
  calendarEvents?: CalendarEvent[];
}

export function SchedulerCalendar({ calendarEvents }: CalendarProps): JSX.Element {
  const computeMeetingTimeDays = (calendarEvent: CalendarEvent) => {
    const days = calendarEvent.meetingTime.days;
    const daysRRule = new Array();

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

  const events = useMemo(() => {
    const events: Event[] = new Array();
    calendarEvents?.forEach((calendarEvent) => {
      const startEndDates = calendarEvent.meetingTime.dateRange.split('-');
      const startEndHours = calendarEvent.meetingTime.time.split('-');
      const startUpperDateRRule = dayjs
        .utc(startEndDates[0].trim() + startEndHours[0].trim(), 'MMM, D, YYYY h:mm a')
        .toDate();
      const startLowerDateRRule = dayjs
        .utc(startEndDates[0].trim() + startEndHours[1].trim(), 'MMM, D, YYYY h:mm a')
        .toDate();
      const endDateRRule = dayjs(startEndDates[1].trim(), 'MMM, D, YYYY').utc().toDate();

      const days = computeMeetingTimeDays(calendarEvent);

      const ruleUpper = new RRule({
        freq: RRule.WEEKLY,
        byweekday: days,
        dtstart: startUpperDateRRule,
        until: endDateRRule,
      });

      const ruleLower = new RRule({
        freq: RRule.WEEKLY,
        byweekday: days,
        dtstart: startLowerDateRRule,
        until: endDateRRule,
      });

      const ruleLowerAll = ruleLower.all();

      ruleUpper.all().map((dateUpper, i) => {
        events.push({
          title: `${calendarEvent.subject} ${calendarEvent.code}`,
          start: new Date(dateUpper.toUTCString().replace('GMT', '')),
          end: new Date(ruleLowerAll[i].toUTCString().replace('GMT', '')),
          resource: {
            color: calendarEvent.color,
            sectionCode: calendarEvent.sectionCode,
            location: calendarEvent.meetingTime.where,
          },
        });
      });
    });

    return events;
  }, [calendarEvents]);

  const today = new Date();

  return (
    <Calendar
      localizer={localizer}
      events={events}
      min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7)}
      max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 22)}
      view="work_week"
      timeslots={10}
      step={3}
      views={['work_week']}
      defaultDate={new Date(2021, 1, 10)}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CustomEvent,
      }}
    />
  );
}
