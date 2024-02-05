import { Term } from '../../lib/term';

import { upsertTermsSections } from './functions/upsertSections';

const registrationDate = process.env[2] ? new Date(process.argv[2]) : new Date();
const dropDate = process.env[3] ? new Date(process.argv[3]) : new Date();
const currentTerm = new Term();
const terms = currentTerm.sessionTerms();

upsertTermsSections(terms, registrationDate, dropDate).then(() => {
  console.log('Done');
  process.exit(0);
});