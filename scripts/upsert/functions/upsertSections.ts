import { differenceInMinutes } from 'date-fns';
import makeFetchCookie from 'fetch-cookie';

import { getSearchResults, setTerm } from '../../../lib/banner';
import { Fetch } from '../../../lib/banner/fetch';
import { range } from '../../../lib/fn';
import { upsertSections } from '../../../lib/sections';
import { findLatestTask, createTask, findLatestTaskByTerm } from '../../../lib/task';
import { Term } from '../../../lib/term';

export const upsertSectionsScript = async (term: string, registrationDay: Date, dropDate: Date, today: Date) => {
  const lastUpdated = await findLatestTaskByTerm('upsertSections', term);

  const minutesSinceLastUpdate = differenceInMinutes(today, lastUpdated?.startedAt ?? -1);

  // If after drop date and courses have been updated within the last 12 hours, return
  if (today > dropDate && minutesSinceLastUpdate <= 720) {
    console.log('Sections have been updated within the last 12 hours');
    return;
  }

  // Else, run the task

  // Establish a session for each request and set the term
  const fc = makeFetchCookie(fetch) as unknown as Fetch;
  await setTerm(fc, term);

  // Get sections
  const init = await getSearchResults(fc, { term, max: 500 });
  const { totalCount } = init;

  const offsets = range(init.data.length, totalCount, init.pageMaxSize);

  const data = [...init.data];

  for (const offset of offsets) {
    const { data } = await getSearchResults(fc, { term, max: init.pageMaxSize, offset });
    data.concat(data);
  }

  await createTask('upsertSections', upsertSections(fc, term, data), {}, term);
};

export const upsertTermsSections = async (terms: Term[], registrationDate: Date, dropDate: Date) => {
  for (const term of terms) {
    console.log('Upserting sections for term', term.toString());
    await upsertSectionsScript(term.toString(), registrationDate, dropDate, new Date());
  }
};
