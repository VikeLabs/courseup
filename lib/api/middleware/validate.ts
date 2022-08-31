import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import type { AnyZodObject } from 'zod';

/**
 * Middlware to validate the request body against a Zod schema.
 * @param next
 * @param t
 * @returns
 */
export const validate = (next: NextApiHandler, schema: AnyZodObject) => (req: NextApiRequest, res: NextApiResponse) => {
  try {
    schema.parse(req.body);
  } catch (error) {
    res.status(400).json({ error });
    return;
  }

  next(req, res);
};
