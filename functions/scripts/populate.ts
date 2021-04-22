import * as admin from 'firebase-admin';
admin.initializeApp({
  projectId: 'staging-clockwork',
});

import { CoursesService } from '../src/courses/Course.service';

const term = '202105';

const main = async () => {
  console.log(`populating Firestore with data for term = ${term}`);
  await CoursesService.populateCourses(term);
  console.log(`finished.`);
};

main();
