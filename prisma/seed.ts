import { getSearchResults, setTerm } from '@courseup/lib/banner';
import { upsertCourses } from '@courseup/lib/courses';
import { range } from '@courseup/lib/fn';
import { upsertSections } from '@courseup/lib/sections';
import makeFetchCookie from 'fetch-cookie';

export const main = async () => {
  console.log('seed');
  const term = '202209';
  console.log('upserting courses for term', term);
  await upsertCourses(term);

  // establish a session for each request
  const fc = makeFetchCookie(fetch) as any;
  console.log('setting term for banner to', term);
  await setTerm(fc, term);

  console.log('fetching search results');
  const init = await getSearchResults(fc, { term, max: 500 });
  const { totalCount } = init;
  console.log('total count', totalCount);

  const offsets = range(init.data.length, totalCount, init.pageMaxSize);
  console.log(init.data);
  await upsertSections(fc, term, [...init.data]);

  for (const offset of offsets) {
    console.log('fetching search results, offset', offset);
    const { data } = await getSearchResults(fc, { term, max: init.pageMaxSize, offset });
    await upsertSections(fc, term, data);
  }
};

main();
