import { Term } from '../../lib/term';

import { upsertTextbooksScript } from './functions/upsertTextbooks';

const registrationDate = process.env[2] ? new Date(process.argv[2]) : new Date();
const dropDate = process.env[3] ? new Date(process.argv[3]) : new Date();
const term = new Term();

upsertTextbooksScript(term.toString(), registrationDate, dropDate, new Date()).then(() => {
  console.log('Done');
  process.exit(0);
});
