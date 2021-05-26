import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Text, HStack, IconButton, VStack } from '@chakra-ui/react';
import addWeeks from 'date-fns/addWeeks';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import * as enUS from 'date-fns/locale';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { MutableRefObject, useMemo, useRef, useState } from 'react';
import 'react-big-calendar/lib/sass/styles.scss';
import '../../shared/styles/CalendarStyles.scss';
import { Calendar, dateFnsLocalizer, Event, EventProps, ToolbarProps } from 'react-big-calendar';
import { RRule } from 'rrule';

import { CalendarEvent } from './CalendarEvent';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const slotPropGetter = (date: Date, resourceId?: number | string) => {
  if (date.getDay() === 2 || date.getDay() === 4)
    return {
      style: {
        backgroundColor: '#F7F7F7',
      },
    };
  else return {};
};

const eventStyleGetter = ({ resource }: Event) => ({
  style: {
    backgroundColor: resource && resource.color,
    color: 'black',
    borderRadius: 0,
    border: 'none',
    cursor: 'default',
  },
});

const CustomEvent = ({ title, event }: EventProps) => {
  return (
    <Flex height="100%" direction="column">
      <HStack w="100%" bg="#EDF2F7" justifyContent="space-between" p="0.2em">
        <Heading size="xs">{title}</Heading>
        <Heading size="xs">{event.resource && event.resource.sectionCode}</Heading>
      </HStack>
      <VStack flex={1} justifyContent="center">
        <Heading
          color={event.resource.textColor ? event.resource.textColor : 'black'}
          justifyContent="center"
          size="sm"
        >
          {event.resource && event.resource.location}
        </Heading>
      </VStack>
    </Flex>
  );
};

export interface SchedulerCalendarProps {
  /**
   * CalendarEvents
   * Parses events that can go into the calendar from this
   */
  calendarEvents?: CalendarEvent[];
}

export function SchedulerCalendar({ calendarEvents }: SchedulerCalendarProps): JSX.Element {
  const minEventDate: MutableRefObject<Date | undefined> = useRef(undefined);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const CustomToolBar = ({ label, date }: ToolbarProps) => {
    return (
      <Flex pb="0.5em" justifyContent="space-between" alignItems="center">
        <Heading size="md">Scheduler</Heading>
        <Text fontSize="xl">{label}</Text>
        <HStack pb="0.2em">
          <Button
            size="sm"
            bg="gray.200"
            onClick={() => {
              setSelectedDate(new Date());
            }}
          >
            Today
          </Button>
          <IconButton
            aria-label="Previous Week"
            bg="gray"
            icon={<ChevronLeftIcon color="white" />}
            size="sm"
            onClick={() => {
              const newDate = new Date(date);
              newDate.setDate(newDate.getDate() - 7);
              setSelectedDate(newDate);
            }}
          />
          <IconButton
            aria-label="Next Week"
            bg="gray"
            icon={<ChevronRightIcon color="white" />}
            size="sm"
            onClick={() => {
              const newDate = new Date(date);
              newDate.setDate(newDate.getDate() + 7);
              setSelectedDate(newDate);
            }}
          />
        </HStack>
      </Flex>
    );
  };

  const computeMeetingTimeDays = (calendarEvent: CalendarEvent) => {
    const days = calendarEvent.meetingTime.days;
    const daysRRule = [];

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
    minEventDate.current = undefined;
    const events: Event[] = [];
    calendarEvents?.forEach((calendarEvent) => {
      try {
        if (calendarEvent.meetingTime.time.indexOf('TBA') !== -1) return;

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

        ruleUpper.all().forEach((dateUpper, i) => {
          const startDate = new Date(dateUpper.toUTCString().replace('GMT', ''));
          events.push({
            title: `${calendarEvent.subject} ${calendarEvent.code}`,
            start: startDate,
            end: new Date(ruleLowerAll[i].toUTCString().replace('GMT', '')),
            resource: {
              color: calendarEvent.color,
              textColor: calendarEvent.textColor,
              sectionCode: calendarEvent.sectionCode,
              location: calendarEvent.meetingTime.where,
            },
          });

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
    setSelectedDate(minEventDate.current ? minEventDate.current : new Date());
    return events;
  }, [calendarEvents]);

  const today = new Date();

  return (
    <Calendar
      localizer={localizer}
      events={events}
      min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)}
      max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20)}
      defaultView="work_week"
      views={['work_week']}
      date={selectedDate}
      eventPropGetter={eventStyleGetter}
      slotPropGetter={slotPropGetter}
      components={{
        toolbar: CustomToolBar,
        event: CustomEvent,
      }}
    />
  );
}
