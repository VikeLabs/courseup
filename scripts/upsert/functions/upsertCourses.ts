import { differenceInDays, differenceInMinutes } from 'date-fns';

import { upsertCourses } from '../../../lib/courses';
import { createTask, findLatestTaskByTerm } from '../../../lib/task';
import { Term } from '../../../lib/term';

export const upsertCoursesScript = async (term: string, registrationDay: Date, dropDate: Date, today: Date) => {
  const daysUntilRegistration = differenceInDays(registrationDay, today);

  const lastUpdated = await findLatestTaskByTerm('upsertCourses', term);

  const minutesSinceLastUpdate = differenceInMinutes(today, lastUpdated?.startedAt ?? -1);

  // If over a week away from registration day, run task less frequently
  if (daysUntilRegistration > 7) {
    // If before drop date and courses have been updated within the last hour, return
    if (today < dropDate && minutesSinceLastUpdate <= 60) return;
    // If after drop date and courses have been updated within the last 24 hours, return
    if (today > dropDate && minutesSinceLastUpdate <= 1440) return;
  }

  // Else, run the task
  await createTask('upsertCourses', upsertCourses(term), {}, term);
};

export const upsertTermsCourses = async (terms: Term[], registrationDate: Date, dropDate: Date) => {
  for (const term of terms) {
    console.log('Upserting courses for term', term.toString());
    await upsertCoursesScript(term.toString(), registrationDate, dropDate, new Date());
  }
};