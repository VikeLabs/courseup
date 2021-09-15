import { Event } from 'react-big-calendar';

export const eventPropGetter = ({ resource }: Event) => ({
  style: {
    backgroundColor: resource && resource.color,
    opacity: resource.opacity ? 0.5 : 1,
    color: 'black',
    borderRadius: 0,
    border: 'none',
    cursor: 'default',
  },
});
