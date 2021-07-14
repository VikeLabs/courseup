import { Section } from 'lib/fetchers';

interface getSectionsProps {
  term: string;
  subject: string;
  code: string;
}

export const getSections = async ({ term, subject, code }: getSectionsProps): Promise<Section[]> => {
  const response = await fetch(`/api/sections/${term}?subject=${subject}&code=${code}`);
  return response.json();
};
