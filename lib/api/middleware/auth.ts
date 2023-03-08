import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { isValidAccessKey } from '@courseup/lib/auth/key';

export const verifyKey = (next: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.headers.authorization?.replace('Bearer ', '');

  if (!key || !isValidAccessKey(key)) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }

  next(req, res);
};
