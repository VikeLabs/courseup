import dayjs from 'dayjs';

export function getButtonTerms(date: dayjs.Dayjs = dayjs()): string[] {
  const year = date.year().toString();
  const prevYear = (date.year() - 1).toString();
  const nextYear = (date.year() + 1).toString();
  const currMonth = date.month();
  const terms: string[] = [];

  if (0 <= currMonth && currMonth < 4) {
    terms.push(`Fall ${prevYear}`);
    terms.push(`Spring ${year}`);
    terms.push(`Summer ${year}`);
  } else if (4 <= currMonth && currMonth < 10) {
    terms.push(`Summer ${year}`);
    terms.push(`Fall ${year}`);
    terms.push(`Spring ${nextYear}`);
  } else {
    terms.push(`Fall ${year}`);
    terms.push(`Spring ${nextYear}`);
    terms.push(`Summer ${nextYear}`);
  }

  return terms;
}

export function getTerms(date: dayjs.Dayjs = dayjs()): string[] {
  const year = date.year().toString();
  const prevYear = (date.year() - 1).toString();
  const nextYear = (date.year() + 1).toString();
  const currMonth = date.month();
  const terms: string[] = [];

  if (0 <= currMonth && currMonth < 4) {
    terms.push(`${prevYear}09`);
    terms.push(`${year}01`);
    terms.push(`${year}05`);
  } else if (4 <= currMonth && currMonth < 10) {
    terms.push(`${year}05`);
    terms.push(`${year}09`);
    terms.push(`${nextYear}01`);
  } else {
    terms.push(`${year}09`);
    terms.push(`${nextYear}01`);
    terms.push(`${nextYear}05`);
  }

  return terms;
}
