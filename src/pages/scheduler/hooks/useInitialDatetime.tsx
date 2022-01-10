import { useMemo } from 'react';

export const useInitialDateTime = (term?: string) => {
  const today = useMemo(() => new Date(), []);
  // determine what date to position the calendar on.
  return useMemo<Date>(() => {
    // if there is a term, use today as the default
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
};
