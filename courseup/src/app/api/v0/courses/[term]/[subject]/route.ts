import { getCourseByPid } from '@lib/courses';
import { Term } from '@lib/validation/term';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import z from 'zod';

const RequestParams = z.object({
  term: Term,
  subject: z.string(),
});

export async function GET(
  req: NextApiRequest,
  {
    params,
  }: {
    params: { term: string; subject: string };
  }
) {
  let paramsParsed;
  try {
    paramsParsed = RequestParams.parse(params);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }
  try {
    // scrape course details. pid = subject in this case
    const course = await getCourseByPid(paramsParsed.term, paramsParsed.subject);
    NextResponse.json(course, { status: 200 });
  } catch (err) {
    console.error(err);
    NextResponse.json({ error: 'an unexpected error occured' }, { status: 500 });
  }
}
