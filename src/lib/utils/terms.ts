/**
 * Fetches the readable text version of a term.
 * Term provided must be in the form of '202101' for this function to work.
 *
 * @param {string} term i.e. '202101'
 * @return {string} 'Spring 2021'
 */
export function getReadableTerm(term: string): string {
  const year = term.slice(0, 4);
  let month = term.slice(4);

  if (month === '01') month = 'Spring';
  else if (month === '05') month = 'Summer';
  else month = 'Fall';

  return `${month} ${year}`;
}

/**
 * Fetches the current term given a date.
 *
 * @param {Date} date
 * @return {string} current term i.e. '202101'
 */
export function getCurrentTerm(date = new Date()): string {
  const year = date.getFullYear().toString();
  const currMonth = date.getMonth();
  let month = '';

  if (0 <= currMonth && currMonth < 4) month = '01';
  else if (4 <= currMonth && currMonth < 8) month = '05';
  else month = '09';

  return `${year}${month}`;
}
