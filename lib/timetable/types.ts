import { z } from 'zod';

import { Term } from '../validation/term';

export const Timetable = z.object({
  term: Term,
  courses: z
    .array(
      z.object({
        subject: z.string(),
        code: z.string(),
        pid: z.string(),
        lecture: z.array(z.string().regex(/^A\d{2}$/)).optional(),
        lab: z.array(z.string().regex(/^B\d{2}$/)).optional(),
        tutorial: z.array(z.string().regex(/^T\d{2}$/)).optional(),
        color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
      })
    )
    .min(1)
    .max(12),
});
