import { getSubjects } from '@courseup/lib/subjects';
import { Term } from '@courseup/lib/validation/term';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const RequestParams = z.object({
  term: Term,
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
  const subjects = await getSubjects(params.term);

  res.setHeader('Cache-Control', `public, max-age=${3600}, s-max-age=${1800}`);
  res.status(200).json(subjects);
}
