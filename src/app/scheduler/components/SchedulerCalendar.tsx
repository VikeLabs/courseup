import { Box } from '@chakra-ui/layout';
import moment from 'moment';
import React from 'react';
import 'react-big-calendar/lib/sass/styles.scss';
import { Calendar, momentLocalizer, EventProps, Event } from 'react-big-calendar';

export interface CalendarProps {}

const localizer = momentLocalizer(moment);

const eventStyleGetter = () => {
  var style = {
    backgroundColor: 'green',
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

class EventComponent extends React.Component<EventProps<Event>> {
  render() {
    return (
      <Box background="green">
        <h1
          onClick={() => {
            console.log('hello world');
          }}
        >
          :))))) it works
        </h1>
      </Box>
    );
  }
}

const events: Event[] = [
  {
    title: 'All Day Event very long title',
    allDay: false,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    title: 'Some Event',
    start: new Date(2015, 3, 9, 1, 0, 0),
    end: new Date(2015, 3, 9, 2, 0, 0),
  },
];

export function SchedulerCalendar({}: CalendarProps): JSX.Element {
  return (
    <Box h="100%" w="100%" p="2em">
      <Calendar
        localizer={localizer}
        events={events}
        view="work_week"
        views={['work_week']}
        defaultDate={new Date(2015, 3, 1)}
        components={{
          event: EventComponent,
        }}
      />
    </Box>
  );
}
