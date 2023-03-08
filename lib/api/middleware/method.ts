import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export const method = (next: NextApiHandler, method: string) => (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== method) {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }
  next(req, res);
};
