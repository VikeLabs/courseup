import { getSubjects } from '@lib/subjects';
import { Term } from '@lib/validation/term';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const RequestParams = z.object({
  term: Term,
});

export async function GET(req: Request, { params }: { params: { term: string } }) {
  console.log(params);
  try {
    params = RequestParams.parse(params);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }
  const subjects = await getSubjects(params.term);

  // res.setHeader('Cache-Control', `public, max-age=${3600}, s-max-age=${1800}`);
  const headers = new Headers([['Cache-Control', `public, max-age=${3600}, s-max-age=${1800}`]]);
  return NextResponse.json(subjects, { headers, status: 200 });
}
