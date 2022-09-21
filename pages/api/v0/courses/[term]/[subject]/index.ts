import { getCourseByPid } from '@courseup/lib/courses';
import { Term } from '@courseup/lib/validation/term';
import type { NextApiRequest, NextApiResponse } from 'next';
import z from 'zod';

const RequestParams = z.object({
  term: Term,
  subject: z.string(),
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
    // scrape course details. pid = subject in this case
    const course = await getCourseByPid(params.term, params.subject);
    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'an unexpected error occured' });
  }
}
