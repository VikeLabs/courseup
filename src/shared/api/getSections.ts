import { Section } from '../fetchers';

interface getSectionsProps {
  term: string;
  subject: string;
  code: string;
}

export const getSections = async ({ term, subject, code }: getSectionsProps): Promise<Section[]> => {
  const response = await fetch(`/sections/${term}?subject=${subject}&code=${code}`);
  return response.json();
};
