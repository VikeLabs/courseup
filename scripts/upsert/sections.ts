import { Term } from '../../lib/term';
import { differenceInMinutes } from 'date-fns';
import { upsertSections } from '../../lib/sections';
import { findLatestTask, createTask } from '../../lib/task';
import { Fetch } from '../../lib/banner/fetch';
import makeFetchCookie from 'fetch-cookie';
import { getSearchResults } from '../../lib/banner';
import { range } from '../../lib/fn';
import fetch from 'node-fetch';

export const upsertSectionsScript = async (term: string, registrationDay: Date, dropDate: Date, today: Date) => {
  const lastUpdated = await findLatestTask(`upsertSections-${term}`);

  const minutesSinceLastUpdate = differenceInMinutes(today, lastUpdated?.startedAt ?? -1);

  // If after drop date and courses have been updated within the last 12 hours, return
  if (today > dropDate && minutesSinceLastUpdate <= 720) return;

  // Else, run the task

  // Establish a session for each request
  const fc = makeFetchCookie(fetch) as unknown as Fetch;

  // Get sections
  const init = await getSearchResults(fc, { term, max: 500 });
  let sectionsCount = 0;
  const { totalCount } = init;

  sectionsCount += init.data.length;
  const offsets = range(init.data.length, totalCount, init.pageMaxSize);

  const data = [...init.data];
  for (const offset of offsets) {
    const { data } = await getSearchResults(fc, { term, max: init.pageMaxSize, offset });
    data.concat(data);
    sectionsCount += data.length;
  }

  await createTask(`upsertSections-${term}`, upsertSections(fc, term, data), {});
};

if (process.env[2] && process.env[3]) {
  const registrationDate = new Date(process.argv[2]);
  const dropDate = new Date(process.argv[3]);

  const terms = new Term().sessionTerms();

  terms.forEach(async (term) => {
    await upsertSectionsScript(term.toString(), registrationDate, dropDate, new Date());
  });
}
