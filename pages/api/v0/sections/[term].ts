import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { getSections } from '@courseup/lib/sections';
import { SubjectEnum } from '@courseup/lib/validation/subject';
import { Term } from '@courseup/lib/validation/term';

const RequestParams = z.object({
  term: Term,
  subject: SubjectEnum,
  code: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // route params
  let params;
  try {
    params = RequestParams.parse(req.query);
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }

  const { term, subject, code } = params;

  const sections = await getSections(term, subject, code);
  // set cache headers
  // res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=900');
  res.status(200).json(sections);
}
