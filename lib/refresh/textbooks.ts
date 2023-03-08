import { Task } from '@prisma/client';
import { load } from 'cheerio';
import { differenceInMinutes } from 'date-fns';

import { createTask, findLatestTask } from '../task';
import { upsertTextbooks } from '../textbooks';

import { isBetween } from './index';

const semesters: {
  [key: string]: string;
} = {
  Winter: '01',
  Summer: '05',
  Fall: '09',
};

/**
 * Gets the bookstore term from the bookstore website.
 * @returns {Promise<String>}
 */
export async function getBookstoreTerm(): Promise<string | null> {
  const res = await fetch('https://www.uvicbookstore.ca/text/');
  const text = await res.text();
  // extract the term from the head/title
  const title = load(text)('head > title').text().split(' ');
  const term = title[0];
  const year = title[1];
  const semester = semesters[term];
  if (!semester) return null;
  return `${year}${semester}`;
}

/**
 * Refreshes the course and section data for the current term.
 * Textbooks are released 3 times a year, a few weeks before the term starts.
 * This data might change until the end of the first month.
 * It is assumed that this function will be called once a day.
 * The function is required to only refresh the data as needed
 */

export async function refreshTextbooks(d: Date): Promise<Task | void> {
  const taskName = 'refresh_textbooks';

  const month = d.getMonth();
  const day = d.getDate();

  // get the previous run of this task
  const prev = await findLatestTask(taskName);
  // if the task has not been run before
  if (!prev?.endedAt) {
    const term = await getBookstoreTerm();
    if (!term) return;
    // if there is no previous run, we have to run the task
    const task = await createTask(taskName, upsertTextbooks(term), {});
    return task;
  }

  // duration since last run of this task in milliseconds
  const diffMinutes = differenceInMinutes(d, prev.endedAt);

  // if the last run was more than 24 hours ago (buffer of 5 minutes on both sides)
  const isMoreThan24Hours = isBetween(diffMinutes, 24 * 60, 24 * 60, 2);
  // has is been more than a week (12 hour buffer) since the end of last task run
  const isMoreThanAWeek = isBetween(diffMinutes, 7 * 24 * 60, 7 * 24 * 60, 6 * 60);

  // active period: the period between right (latter half the month before)
  // before the start of the term when the textbooks are released
  // should be called once a day
  // and the end of the first month of the term
  // example: 12/15 - 01/15 (inclusive) == active period
  // example: 08/15 - 09/15 (inclusive) == active period
  // example: 04/15 - 05/15 (inclusive) == active period
  const isActivePeriod = ([12, 4, 8].includes(month) && day >= 15) || ([1, 5, 9].includes(month) && day <= 15);

  if (isActivePeriod && isMoreThan24Hours) {
    const term = await getBookstoreTerm();
    if (!term) return;
    const task = await createTask(taskName, upsertTextbooks(term), {
      term,
    });
    return task;
  }

  // non-active period: the period between the end of the first month of the term and the start of the next term
  // should be called once a week
  // example: 9/16 - 12/14 (inclusive) == non-active period
  // example: 5/16 - 8/14 (inclusive) == non-active period
  // example: 1/16 - 4/14 (inclusive) == non-active period
  if (isMoreThanAWeek) {
    const term = await getBookstoreTerm();
    if (!term) return;
    const task = await createTask(taskName, upsertTextbooks(term), {
      term,
      driftInMinutes: diffMinutes,
    });
    return task;
  }
}
