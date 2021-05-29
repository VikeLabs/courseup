import { CoursesService } from '../src/courses/Course.service';
import * as admin from 'firebase-admin';

admin.initializeApp({ projectId: 'staging-clockwork' });

const main = async () => {
  console.log('populating database with courses');
  await CoursesService.populateCourses('202109');
};

main();
