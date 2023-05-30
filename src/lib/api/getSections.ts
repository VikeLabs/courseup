import { Section } from 'lib/fetchers';

interface getSectionsProps {
  term: string;
  subject: string;
  code: string;
}

export const getSections = async ({ term, subject, code }: getSectionsProps): Promise<Section[]> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL ?? '/api'}/sections/${term}?subject=${subject}&code=${code}&v9=true`
  );
  return response.json();
};
