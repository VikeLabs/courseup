import { getCourses, getCoursesInSession } from '@courseup/lib/courses';
import { Term } from '@courseup/lib/validation/term';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const RequestParams = z.object({
  term: Term,
  // eslint-disable-next-line camelcase
  in_session: z.enum(['true', 'false']).default('false'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  let params;
  try {
    params = RequestParams.parse(req.query);
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }

  try {
    const courses = params.in_session === 'true' ? getCoursesInSession(params.term) : getCourses(params.term);
    // set cache headers
    // res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).json(await courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'an unexpected error occured' });
  }
}
