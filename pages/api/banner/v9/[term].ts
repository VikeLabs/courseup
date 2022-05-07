import type { NextApiRequest, NextApiResponse } from 'next';

import { BannerClient } from '../../../../utils/bannerClient';

const banner = new BannerClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { term } = req.query as { term: string };
  await banner.getTerms(0, 100);
  await banner.setTerm(term);
  const d = await banner.getSearchResultsAll();
  res.status(200).json(d);
}
