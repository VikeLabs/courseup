import fetch from 'node-fetch';
import algoliasearch from 'algoliasearch';

if (process.argv.length != 3) throw Error('Term argument not found.');

const term: string = process.argv[2];

if (!/20\d{2}0[1,5,9]/.test(term.trim()))
  throw Error('Invalid term argument format');

const BASE = 'https://courseup.vikelabs.ca/api';

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

if (!ALGOLIA_APP_ID || !ALGOLIA_ADMIN_KEY || !ALGOLIA_INDEX_NAME) {
  throw Error('Algolia environment variables not found.');
}

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

interface Course {
  subject: string;
  code: string;
  pid: string;
  description: string;
  title: string;
}

const getCourses = async (term: string): Promise<Course[]> => {
  const res = await fetch(`${BASE}/courses/${term}`);
  const data: Course[] = await res.json();
  return data;
};

const getCourse = async (term: string, course: Course): Promise<Course> => {
  const res = await fetch(
    `${BASE}/courses/${term}/${course.subject}/${course.code}`
  );
  const data: Course = await res.json();
  return data;
};

const main = async () => {
  const courses: Course[] = await getCourses(term);

  console.log(`Found ${courses.length} courses for ${term}`);

  const values = courses.values();

  const vals: Course[] = [];

  const workers = Array(50)
    .fill(values)
    .map(async (iterator) => {
      for (const course of iterator) {
        const courseDetails = await getCourse(term, course);
        console.log(course.subject, course.code);
        vals.push({ ...courseDetails });
      }
    });

  await Promise.allSettled(workers);

  const coursesForIndex = vals.map((course) => ({
    objectID: `${course.subject}${course.code}`,
    subject: course.subject,
    code: course.code,
    pid: course.pid,
    description: course.description,
    title: course.title,
  }));

  index
    .saveObjects(coursesForIndex)
    .then(({ objectIDs }) => {
      console.log(objectIDs);
    })
    .catch((err) => {
      console.log(err);
    });
};

main();
