import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { verifyKey } from '@courseup/lib/api/middleware/auth';
import { method } from '@courseup/lib/api/middleware/method';
import { validate } from '@courseup/lib/api/middleware/validate';
import { upsertCourses } from '@courseup/lib/courses';
import { createTask } from '@courseup/lib/task';
import { TaskResponse } from '@courseup/lib/task/response';

const RequestParams = z.object({
  term: z.string(),
});

async function handler(req: NextApiRequest, res: NextApiResponse<TaskResponse>) {
  const { term } = RequestParams.parse(req.query);

  const task = await createTask('course_seed', upsertCourses(term), {
    term,
  });

  res.status(200).json({
    ...task,
    message: 'ok',
  });
}

export default verifyKey(validate(method(handler, 'PUT'), RequestParams));
