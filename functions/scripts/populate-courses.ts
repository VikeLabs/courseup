import { CoursesService } from '../src/courses/Course.service';
import * as admin from 'firebase-admin';
import { Term } from '../src/constants';

admin.initializeApp({ credential: admin.credential.applicationDefault() });

if(process.argv.length != 3) throw Error('Term argument not found.')

const term = process.argv[2];

if(!/20\d{2}0[1,5,9]/.test(term.trim())) throw Error('Invalid term argument format')

const main = async () => {
  console.log('populating database with courses');
  await CoursesService.populateCourses(process.argv[2] as Term);
};

main();
