import { verifyKey } from '@courseup/lib/api/middleware/auth';
import { method } from '@courseup/lib/api/middleware/method';
import { createTask } from '@courseup/lib/task';
import { upsertTextbooks } from '@courseup/lib/textbooks';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const RequestParams = z.object({
  term: z.string(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { term } = RequestParams.parse(req.query);

  const task = await createTask('textbook_seed', upsertTextbooks(term), {
    term,
  });

  res.status(200).json({
    message: 'ok',
    taskId: task.id,
    duration: task.duration,
  });
}

export default verifyKey(method(handler, 'PUT'));
