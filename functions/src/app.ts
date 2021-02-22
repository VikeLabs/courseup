// src/app.ts
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { RegisterRoutes } from '../build/routes';

import * as openapi from '../build/swagger.json';

export const app = express();

// DO NOT CHANGE UNLESS firebase.json record is updated as well.
const API_PREFIX = 'api';

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

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
  app.get('/openapi.json', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(openapi);
  });
}

RegisterRoutes(app);
