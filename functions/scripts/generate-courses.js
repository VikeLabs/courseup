const { writeFile } = require('fs').promises;
const fetch = require('node-fetch');

if (process.argv.length != 3) throw Error('Term argument not found.');

const term = process.argv[2];

if (!/20\d{2}0[1,5,9]/.test(term.trim()))
  throw Error('Invalid term argument format');

const BASE = 'https://courseup.vikelabs.ca/api';

const getCourses = async (term) => {
  const res = await fetch(`${BASE}/courses/${term}`);
  const data = await res.json();
  return data;
};

const getCourse = async (term, course) => {
  const res = await fetch(
    `${BASE}/courses/${term}/${course.subject}/${course.code}`
  );
  const data = await res.json();
  return data;
};

const getCourseSections = async (term, course) => {
  const res = await fetch(
    `${BASE}/sections/${term}?subject=${course.subject}&code=${course.code}`
  );
  const data = await res.json();
  return data;
};

const main = async () => {
  const courses = await getCourses(term);

  const values = courses.values();

  const vals = [];

  const workers = Array(50)
    .fill(values)
    .map(async (interator, i) => {
      for (const course of interator) {
        const [courseDetails, courseSections] = await Promise.all([
          getCourse(term, course),
          getCourseSections(term, course),
        ]);
        console.log(course.subject, course.code);
        vals.push({ ...courseDetails, sections: courseSections });
      }
    });

  await Promise.allSettled(workers);

  await writeFile('courses.json', JSON.stringify(vals));
};

main();
