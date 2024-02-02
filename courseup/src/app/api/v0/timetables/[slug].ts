import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { getTimetable } from '@courseup/lib/timetable';

const RequestParams = z.object({
  slug: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  let params;
  try {
    params = RequestParams.parse(req.query);
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }

  const data = await getTimetable(params.slug);
  res.setHeader(
    'Cache-Control',
    `public, max-age=${3600}, s-max-age=${3600}, stale-while-revalidate=${30}, stale-if-error=${60}`
  );
  res.status(200).json(data);
}
