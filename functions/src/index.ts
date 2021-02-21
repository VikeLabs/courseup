import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// FIX: need to initialize Firebase prior to import of app.
// there's probably a better way to fix this issue.
admin.initializeApp();
import { app } from './app';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// By default, /api/* will be routed to this Express app.
export const api = functions.https.onRequest(app);

// TODO: import in from SectionsService
// export const updateCRNMap = functions.pubsub
//   .schedule('every monday 00:00')
//   .onRun(async (context) => {});
