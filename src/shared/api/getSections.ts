interface getSectionsProps {
  term: string;
  subject: string;
  code: string;
}

export const getSections = async ({ term, subject, code }: getSectionsProps) => {
  const response = await fetch(`/api/sections/${term}?subject=${subject}&code=${code}`);
  return response.json();
};
