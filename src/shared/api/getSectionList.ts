import { Section, Term } from '../fetchers';

interface getSectionListProps {
  term: string;
  subject: string;
  code: string;
}

export const getSectionList = async ({ term, subject, code }: getSectionListProps) => {
  const response = await fetch(`https://clockwork.vikelabs.dev/api/sections/${term}?subject=${subject}&code=${code}`);
  return response.json();
};

//https://clockwork.vikelabs.dev/api/sections/${term}?subject=${term}&code=${code}
