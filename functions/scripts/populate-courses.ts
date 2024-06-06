import { CoursesService } from '../src/courses/Course.service';
import * as admin from 'firebase-admin';
import { Term } from '../src/constants';

// to allow this script to run locally without fudging things around
if (process.env.FIRESTORE_EMULATOR_HOST) {
  admin.initializeApp({
    projectId: 'development',
  });
} else {
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
}

if (process.argv.length != 4) throw Error(`usage: ${process.argv[0]} ${process.argv[1]} [term] [cookie]`);

const term = process.argv[2].trim();

if (!/^20\d{2}0[1,5,9]$/.test(term))
  throw Error('Invalid term argument format');

const cookie = process.argv[3].trim();

if (!/^[0-9A-F]{32}$/.test(cookie))
  throw Error('Invalid cookie argument format');

const main = async () => {
  console.log('Populating Firestore with data...');
  await CoursesService.populateCourses(term as Term, cookie);
};

main();
