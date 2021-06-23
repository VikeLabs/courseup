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

  if (month === '01') month = 'Winter';
  else if (month === '05') month = 'Summer';
  else month = 'Fall';

  return `${month} ${year}`;
}

/**
 * Fetches the current terms of a school year given a date.
 *
 * @param {Date} date
 * @return {string[]} array of terms ['202009', '202101', '202105']
 */
export function getCurrentTerms(date: Date = new Date()): string[] {
  const year = date.getFullYear();
  const prevYear = date.getFullYear() - 1;
  const nextYear = date.getFullYear() + 1;
  const currMonth = date.getMonth();

  if (0 <= currMonth && currMonth < 4) {
    return [`${prevYear}09`, `${year}01`, `${year}05`];
  } else if (4 <= currMonth && currMonth < 10) {
    return [`${year}05`, `${year}09`, `${nextYear}01`];
  } else {
    return [`${year}09`, `${nextYear}01`, `${nextYear}05`];
  }
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
  else if (4 <= currMonth && currMonth < 10) month = '05';
  else month = '09';

  return `${year}${month}`;
}
