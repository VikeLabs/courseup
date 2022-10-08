import { Term } from '../functions/src/constants';
import { getCurrentTerm } from '../functions/src/utils';
import { upsertCourses } from '../lib/courses';
import { findLatestTask, createTask } from '../lib/task';

const seconds = 1000;
const minutes = 60 * seconds;
const hours = 60 * minutes;
const days = 24 * hours;

const today = new Date();
const term = getCurrentTerm(today);

if (!/20\d{2}0[1,5,9]/.test(term.trim())) throw Error('Invalid term argument format');

let registrationDay = new Date('2022-09-01');
// Replace registration day with CLI parameter if provided
if (process.argv[2]) {
  registrationDay = new Date(process.argv[2]);
}

let dropDate = new Date('2022-10-31');
// Replace drop date with CLI parameter if provided
if (process.argv[3]) {
  dropDate = new Date(process.argv[3]);
}

const daysUntilRegistration = Math.floor((registrationDay.getTime() - today.getTime()) / days);

export const upsertCoursesScript = async () => {
  const lastUpdated = await findLatestTask(`upsertCourses-${term}`);

  const minutesSinceLastUpdate = lastUpdated
    ? Math.floor((today.getTime() - lastUpdated.startedAt.getTime()) / minutes)
    : null;

  // If within a week of registration day, run the task every 30min
  if (daysUntilRegistration <= 7) {
    await createTask(`upsertCourses-${term}`, upsertCourses(term as Term), {});
    return;
  }

  // If before drop date and courses have been updated within the last 60 minutes, return
  if (today < dropDate && (minutesSinceLastUpdate ?? 100) <= 60) return;
  // If after drop date and courses have been updated within the last 24 hours, return
  if (today > dropDate && (minutesSinceLastUpdate ?? 1500) <= 1440) return;

  // Else, run the task
  await createTask(`upsertCourses-${term}`, upsertCourses(term as Term), {});
};

upsertCoursesScript();
