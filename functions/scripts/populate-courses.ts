import { CoursesService } from '../src/courses/Course.service';
import * as admin from 'firebase-admin';
import { Term } from '../src/constants';

// to allow this script to run locally without fudging things around
if (process.env.FIRESTORE_EMULATOR_HOST) {
  admin.initializeApp({
    projectId: 'development',
  });
}

if (process.argv.length != 3) throw Error('Term argument not found.');

const term = process.argv[2];

if (!/20\d{2}0[1,5,9]/.test(term.trim()))
  throw Error('Invalid term argument format');

const main = async () => {
  console.log('populating database with courses');
  await CoursesService.populateCourses(term as Term);
};

main();
