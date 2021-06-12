/**
 * Compares two dates and returns true if the same day
 *  else returns false
 *
 * @param {Date} firstDate
 * @param {Date} secondDate
 * @return {Boolean} returns true if the dates are the same day
 */
export function isSameDay(firstDate: Date, secondDate: Date) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}
