export function randomString(len: number): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  if (len === 0) return '';

  return Array(len)
    .join()
    .split(',')
    .map(() => alphabet.charAt(Math.floor(Math.random() * alphabet.length)))
    .join('');
}

// formats times of format 'HHMM' to 'HH:MM am/pm'
// required to match banner v9 and v8 data
export function formatTime(time: string): string {
  let hour = Number(time.slice(0, 2));
  const minute = time.slice(2);
  const meridiem = hour >= 12 ? 'pm' : 'am';

  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${hour}:${minute} ${meridiem}`;
}

/**
 * Fetches the current term given a date.
 *
 * @param {Date} date
 * @return {string} current term i.e. '202101'
 */
export function getCurrentTerm(date: Date = new Date()): string {
  const year = date.getFullYear().toString();
  const currMonth = date.getMonth();
  let month = '';

  if (0 <= currMonth && currMonth < 4) month = '01';
  else if (4 <= currMonth && currMonth < 8) month = '05';
  else month = '09';

  return `${year}${month}`;
}
