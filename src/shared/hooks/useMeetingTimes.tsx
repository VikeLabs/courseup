import { useCallback, useState } from 'react';

import { getSections } from '../api/getSections';
import { MeetingTimes } from '../fetchers';

type Result =
  | undefined
  | { status: 'loaded'; data: MeetingTimes[] }
  | { status: 'loading' }
  | { status: 'error'; errorMessage: string };

export const useMeetingTimes = (
  term: string
): [
  Result,
  ({ subject, code, sectionCode }: { subject: string; code: string; sectionCode: string }) => Promise<void>
] => {
  const [result, setResult] = useState<Result>(undefined);

  const meetingTimes = useCallback(
    async ({ subject, code, sectionCode }: { subject: string; code: string; sectionCode: string }) => {
      setResult({ status: 'loading' });

      const sections = await getSections({ term, subject, code });
      const section = sections.find((section) => section.sectionCode === sectionCode);

      if (!section?.meetingTimes) {
        setResult({ status: 'error', errorMessage: 'No meeting times found for section.' });
      } else {
        setResult({ status: 'loaded', data: section.meetingTimes });
      }
    },
    [term]
  );

  return [result, meetingTimes];
};
