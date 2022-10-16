import { Term } from '../lib/term';
import { differenceInDays, differenceInMinutes } from 'date-fns';
import { upsertCourses } from '../lib/courses';
import { findLatestTask, createTask } from '../lib/task';

export const upsertCoursesScript = async (term: string, registrationDay: Date, dropDate: Date) => {
  const today = new Date();

  const daysUntilRegistration = differenceInDays(registrationDay, today);

  const lastUpdated = await findLatestTask(`upsertCourses-${term}`);

  const minutesSinceLastUpdate = differenceInMinutes(today, lastUpdated?.startedAt ?? -1);

  // If over a week away from registration day, run task less frequently
  if (daysUntilRegistration > 7) {
    // If before drop date and courses have been updated within the last hour, return
    if (today < dropDate && minutesSinceLastUpdate <= 60) return;
    // If after drop date and courses have been updated within the last 24 hours, return
    if (today > dropDate && minutesSinceLastUpdate <= 1440) return;
  }

  // Else, run the task
  await createTask(`upsertCourses-${term}`, upsertCourses(term), {});
};

if (process.env[2] && process.env[3]) {
  const registrationDate = new Date(process.argv[2]);
  const dropDate = new Date(process.argv[3]);

  const terms = new Term().sessionTerms();

  terms.forEach(async (term) => {
    await upsertCoursesScript(term.toString(), registrationDate, dropDate);
  });
}
