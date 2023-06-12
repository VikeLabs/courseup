const { writeFile, readFile } = require('fs').promises;

const main = async () => {
  const data = JSON.parse(await readFile('courses.json', 'utf-8'));

  const courses = data.map((course) => ({
    subjectCode: `${course.subject}${course.code}`,
    subject: course.subject,
    code: course.code,
    pid: course.pid,
    description: course.description,
    title: course.title,
  }));

  await writeFile('index.json', JSON.stringify(courses));
};

main();
