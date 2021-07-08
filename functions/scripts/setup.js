/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');
const fs = require('fs');

// term to populate date for
const term = '202109';

// command to run to populate data
const command = `npm run db:populate ${term}`;

// directory to store firestore data
const dir = 'tmp/firestore';

if (fs.existsSync(dir) || process.env.CI) {
  return 0;
}

fs.mkdirSync(dir, { recursive: true });

exec(
  `firebase emulators:exec "${command}" --import=${dir} --export-on-exit --project development --only firestore`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout:\n${stdout}`);
  }
);
