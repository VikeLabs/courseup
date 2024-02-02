import type { NextApiRequest, NextApiResponse } from 'next';

import { addTimetable } from '@courseup/lib/timetable';
import { Timetable } from '@courseup/lib/timetable/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  let body;
  try {
    body = Timetable.parse(req.body);
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }

  const data = await addTimetable(body.courses, body.term);
  if (!data) {
    res.status(500).json({ error: 'Failed to add timetable' });
    return;
  }
  res.status(200).json({
    slug: data,
    courses: body.courses,
    term: body.term,
  });
}
