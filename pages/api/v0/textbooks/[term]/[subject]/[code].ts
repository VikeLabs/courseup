import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { getTextbooks } from '@courseup/lib/textbooks';
import { SubjectEnum } from '@courseup/lib/validation/subject';
import { Term } from '@courseup/lib/validation/term';

const RequestParams = z.object({
  term: Term,
  subject: SubjectEnum,
  code: z.string(),
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
  const data = await getTextbooks(params.term, params.subject, params.code);

  // res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=900');
  res.status(200).json(data);
}
