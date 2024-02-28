import { getCourseBySubjectCode } from '@lib/courses';
import { getReadableTerm } from '@lib/utils/terms';
import { children } from 'cheerio/lib/api/traversing';

export default async function ExploreCourse({ params }: { params: { term: string; subject: string; code: string } }) {
  const course = await getCourseBySubjectCode(params.term, params.subject, params.code);
  return (
    <div className="hero min-h-screen place-items-start">
      <ul className="px-0 py-0 hero-content flex-col items-start">
        <h1 className="text-5xl font-bold">
          {course.subject}
          {course.code}
        </h1>
        <h2 className="text-3xl font-semibold">{course.title}</h2>
        <HRule />
        <p className="text-lg">{course.description}</p>
        <HRule />
        {/* Badges (Lecture, Lab, Tutorial, Credits) */}
        <div className="w-full flex flex-row gap-3">
          <Badge color="primary">Lecture: {course.hoursCatalog ? course.hoursCatalog[0].lecture : 0}h</Badge>
          <Badge color="secondary">Lab: {course.hoursCatalog ? course.hoursCatalog[0].lab : 0}h</Badge>
          <Badge color="accent">Tutorial: {course.hoursCatalog ? course.hoursCatalog[0].tutorial : 0}h</Badge>
        </div>
        <Badge>
          Credits: {typeof course.credits.value === 'string' ? course.credits.value : course.credits.value.min}
        </Badge>
      </ul>
    </div>
  );
}

function HRule(): JSX.Element {
  return <div className="w-full h-0.5 rounded-full bg-base-content opacity-75" />;
}

function Badge({
  children,
  color,
}: {
  children: Readonly<React.ReactNode>;
  color?: 'primary' | 'secondary' | 'accent';
}): React.ReactNode {
  return <div className={`badge badge-lg ${!!color ? `badge-${color}` : ''} badge-outline`}>{children}</div>;
}
