import { Box } from '@chakra-ui/layout';
import moment from 'moment';
import 'react-big-calendar/lib/sass/styles.scss';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';

import { ClassScheduleListing, Course, Section, useSections } from '../../../fetchers';

const localizer = momentLocalizer(moment);

const titles: Map<string, string> = new Map();

titles.set('event1', 'green');
titles.set('event2', 'red');
titles.set('event3', 'Blue');

const eventStyleGetter = ({ title }: Event) => {
  var style = {
    backgroundColor: title ? titles.get(title) : 'blue',
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

const events: Event[] = [
  {
    title: 'event1',
    allDay: false,
    start: new Date(2015, 3, 0, 5, 0, 0),
    end: new Date(2015, 3, 0, 6, 0, 0),
  },
  {
    title: 'event2',
    allDay: false,
    start: new Date(2015, 3, 9, 1, 0, 0),
    end: new Date(2015, 3, 9, 2, 0, 0),
  },
  {
    title: 'event3',
    allDay: false,
    start: new Date(2015, 3, 9, 3, 0, 0),
    end: new Date(2015, 3, 9, 4, 0, 0),
  },
];

export interface CalendarProps {
  courses?: Course[];
}

export function SchedulerCalendar({ courses }: CalendarProps): JSX.Element {
  const term = '202105';
  const classScheduleListing: ClassScheduleListing[] | null = new Array();

  // for (var i = 0; i < courses.length; i++) {
  //   const subject = courses[i].subject;
  //   const code = courses[i].code;
  //   const { data: scehdulelisting } = useSections({ term, queryParams: { subject, code } });
  //   classScheduleListing.push(scehdulelisting);
  // }

  return (
    <Box h="100%" w="100%" p="2em">
      <Calendar
        localizer={localizer}
        events={events}
        view="work_week"
        views={['work_week']}
        defaultDate={new Date(2015, 3, 1)}
        eventPropGetter={eventStyleGetter}
      />
    </Box>
  );
}
