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
