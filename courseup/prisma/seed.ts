import makeFetchCookie from 'fetch-cookie';

import { getSearchResults, setTerm } from '../lib/banner';
import { Fetch } from '../lib/banner/fetch';
import { upsertCourses } from '../lib/courses';
import { range } from '../lib/fn';
import { upsertSections } from '../lib/sections';
import { Term } from '../lib/term';

const term = new Term().toString();

export const main = async () => {
  console.log('upserting courses for term', term);
  await upsertCourses(term);
  console.log('done upserting courses');

  // establish a session for each request
  const fc = makeFetchCookie(fetch);
  const id = Math.random().toString(36).substring(10);
  console.log('setting term for banner to', term);
  await setTerm(fc, term, id);

  console.log('fetching search results');
  const init = await getSearchResults(fc, { term, max: 500, id });
  const { totalCount } = init;
  console.log('total count', totalCount);

  const offsets = range(init.data.length, totalCount, init.pageMaxSize);
  await upsertSections(fc, term, [...init.data]);
  // console.log('initial data', JSON.stringify(init.data, null, 2));

  for (const offset of offsets) {
    console.log('fetching search results, offset', offset);
    const { data } = await getSearchResults(fc, { term, max: init.pageMaxSize, offset, id });
    // console.log('data', JSON.stringify(data, null, 2));
    await upsertSections(fc, term, data);
  }
};

main();
