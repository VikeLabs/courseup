import { differenceInDays, differenceInMinutes } from 'date-fns';

import { createTask, findLatestTaskByTerm } from '../../../lib/task';
import { upsertTextbooks } from '../../../lib/textbooks';

export const upsertTextbooksScript = async (term: string, registrationDay: Date, dropDate: Date, today: Date) => {
  const daysUntilRegistration = differenceInDays(registrationDay, today);

  const lastUpdated = await findLatestTaskByTerm('upsertTextbooks', term);

  const minutesSinceLastUpdate = differenceInMinutes(today, lastUpdated?.startedAt ?? -1);

  // If over a week away from registration day, run task less frequently
  if (daysUntilRegistration > 7) {
    // If before drop date and courses have been updated within the last hour, return
    if (today < dropDate && minutesSinceLastUpdate <= 60) return;
    // If after drop date and courses have been updated within the last 24 hours, return
    if (today > dropDate && minutesSinceLastUpdate <= 1440) return;
  }

  // Else, run the task
  await createTask('upsertTextbooks', upsertTextbooks(term), {}, term);
};
