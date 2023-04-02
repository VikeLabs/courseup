import { Term } from '../../lib/term';

import { upsertTermsCourses } from './functions/upsertCourses';

const currentTerm = process.env[2] ? Term.fromString(process.argv[2]) : new Term();
const registrationDate = process.env[3] ? new Date(process.argv[3]) : new Date();
const dropDate = process.env[4] ? new Date(process.argv[4]) : new Date();
const terms = currentTerm.sessionTerms();

upsertTermsCourses(terms, registrationDate, dropDate).then(() => {
  console.log('Done');
  process.exit(0);
});
