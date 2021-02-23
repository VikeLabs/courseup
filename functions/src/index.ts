import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// THIS FILE SHOULDN'T RUN WITHOUT FIREBASE EMULATOR!
// nor is it meant to be. use server.ts!

// FIX: need to initialize Firebase prior to import of app.
// there's probably a better way to fix this issue.
admin.initializeApp();
import { app } from './app';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// DO NOT CHANGE UNLESS firebase.json record is updated as well.
const API_PREFIX = 'api';

// a slight "hack" to get things to play well in Cloud Functions
// none of the below is required when running locally.
// Since the CDN rewrite rule in firebase.json sends all requests that start with `/api`
// to the Cloud Function but the Express app doesn't have a route that starts
// with `/api`, we need to remove it or make another router with app.use('/api', actualRouter)`
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.url.indexOf(`/${API_PREFIX}/`) === 0) {
      req.url = req.url.substring(API_PREFIX.length + 1);
    }
    next();
  });
}

// By default, /api/* will be routed to this Express app.
export const api = functions.https.onRequest(app);

// TODO: import in from SectionsService
// export const updateCRNMap = functions.pubsub
//   .schedule('every monday 00:00')
//   .onRun(async (context) => {});
