interface getSectionListProps {
  term: string;
  subject: string;
  code: string;
}

export const getSectionList = async ({ term, subject, code }: getSectionListProps) => {
  // return fetch(`https://clockwork.vikelabs.dev/api/sections/${term}?subject=${subject}&code=${code}`);
  console.log(`fetching ${subject} ${code}`);
  const response = await fetch(`https://clockwork.vikelabs.dev/api/sections/${term}?subject=${subject}&code=${code}`);
  return response.json();
};
