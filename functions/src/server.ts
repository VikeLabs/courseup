import * as admin from 'firebase-admin';

const port = process.env.PORT || 3000;

admin.initializeApp({
  projectId: 'staging-clockwork',
});

import { app } from './app';

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
