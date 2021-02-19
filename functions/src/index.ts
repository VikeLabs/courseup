import * as functions from 'firebase-functions';
import * as express from 'express';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const app = express();

app.get('/hello', async (req, res) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  res.send('Hello from Firebase with Express!');
});

// By default, /api/* will be routed to this Express app.
export const api = functions.https.onRequest(app);
