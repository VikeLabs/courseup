import { isValidAccessKey } from '@courseup/lib/auth/key';
import { setTerm, getSearchResults } from '@courseup/lib/banner';
import { upsertSections } from '@courseup/lib/courses';
import { range } from '@courseup/lib/fn';
import makeFetchCookie from 'fetch-cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const RequestParams = z.object({
  term: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  // extract from bearer token
  const accessKey = req.headers.authorization?.replace('Bearer ', '');

  if (!isValidAccessKey(accessKey ?? '')) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }

  // if this is running on production (vercel) this endpoint cannot be used
  // as it will exceed the 60 second limit
  if (process.env.VERCEL_ENV === 'production') {
    res.status(403).json({ error: 'forbidden' });
    return;
  }

  // measure time
  const start = performance.now();

  const { term } = RequestParams.parse(req.query);
  // establish a session for each request
  const fc = makeFetchCookie(fetch);

  await setTerm(fc, term);

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
  await upsertSections(fc, term, data);

  res.status(200).json({
    message: 'ok',
    time: performance.now() - start,
    sectionsInserted: sectionsCount,
  });
}
