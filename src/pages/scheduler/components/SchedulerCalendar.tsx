import { MutableRefObject, useCallback, useMemo, useRef, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Text, HStack, IconButton, VStack } from '@chakra-ui/react';
import addWeeks from 'date-fns/addWeeks';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import * as enUS from 'date-fns/locale';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import 'react-big-calendar/lib/sass/styles.scss';
import { Calendar, dateFnsLocalizer, Event, EventProps, ToolbarProps } from 'react-big-calendar';
import { useParams } from 'react-router';
import { RRule } from 'rrule';

import '../styles/CalendarStyles.scss';
import { CalendarEvent } from '../shared/types';

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
    opacity: resource.opacity ? 0.5 : 1,
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
  const { term } = useParams();

  const getSelectedDate = useCallback(() => {
    const month = /\d{4}(\d{2})/.exec(term);
    const year = /(\d{4})\d{2}/.exec(term);
    const today = new Date();
    // if the selected term's first month is before or during the current month
    // && the selected term's last month is after or during the current month
    // && the selected term's year is the current year
    // return today
    // else return the 2nd week (when most labs start) of the first month of the selected term
    if (
      month &&
      year &&
      Number(month[1]) <= today.getMonth() + 1 &&
      Number(month[1]) + 4 >= today.getMonth() + 1 &&
      Number(year[1]) === today.getFullYear()
    ) {
      return today;
    } else {
      if (year && month) return new Date(Number(year[1]), Number(month[1]) - 1, 12);
    }
    return today;
  }, [term]);

  const getTermMonthLowerBound = useCallback(() => {
    const month = /\d{4}(\d{2})/.exec(term);
    const year = /(\d{4})\d{2}/.exec(term);

    const lowerBound = new Date(Date.UTC(year ? parseInt(year[1]) : 2021, month ? parseInt(month[1]) : 1, 0, 0, 0, 0));

    return lowerBound;
  }, [term]);

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

        const lowerBound = getTermMonthLowerBound();

        const startEndDates = calendarEvent.meetingTime.dateRange.split('-');
        const startEndHours = calendarEvent.meetingTime.time.split('-');

        const courseStartDate = new Date(startEndDates[0].replace(',', '') + ' 00:00:00 GMT');

        const startDateString = `${lowerBound.getMonth() + 1}, 1, ${lowerBound.getUTCFullYear()}`;
        const startUpperDateRRule = parse(
          `${startDateString} ${startEndHours[0].trim()} +00:00`,
          'MM, d, yyyy h:mm a XXX',
          new Date()
        );
        const startLowerDateRRule = parse(
          `${startDateString} ${startEndHours[1].trim()} +00:00`,
          'MM, d, yyyy h:mm a XXX',
          new Date()
        );

        const endDateRRule = new Date(startEndDates[1].replace(',', '') + ' 00:00:00 GMT');

        const days = computeMeetingTimeDays(calendarEvent);

        // HACK: something doesn't like when start & end dates are the same
        // adding 1 day to the end date makes everything happy :-)
        endDateRRule.setDate(endDateRRule.getDate() + 1);

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
          const title = `${calendarEvent.subject} ${calendarEvent.code}`;
          const endDate = new Date(ruleLowerAll[i].toUTCString().replace('GMT', ''));
          const duplicateEvent = events.find((event) => {
            return (
              event.title === title &&
              event.start?.getTime() === startDate.getTime() &&
              event.end?.getTime() === endDate.getTime()
            );
          });
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

    setSelectedDate(getSelectedDate());

    return events;
  }, [calendarEvents, getSelectedDate, getTermMonthLowerBound]);

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
      dayLayoutAlgorithm="no-overlap"
    />
  );
}
