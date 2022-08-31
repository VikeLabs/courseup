import z from 'zod';

export const CourseTextbook = z.object({
  id: z.number(),
  dept: z.string(),
  code: z.string(),
  section: z.string(),
});
