// src/app.ts
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { RegisterRoutes } from '../build/routes';

import * as openapi from '../build/swagger.json';

export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// TODO: can probably accomplish the same thing using hosting.
// serve the OpenAPI spec.
app.get('/openapi.json', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openapi);
});

RegisterRoutes(app);
