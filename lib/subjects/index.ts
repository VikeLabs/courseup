import { prisma } from '../prisma';

export async function getSubjects(term: string) {
  const subjects = await prisma.course.findMany({
    where: {
      term: term,
    },
    select: {
      subject: true,
      subjectDescription: true,
    },
    distinct: ['subject'],
    orderBy: {
      subject: 'asc',
    },
  });
  return subjects.map(({ subject, subjectDescription }) => ({
    subject,
    title: subjectDescription,
  }));
}
