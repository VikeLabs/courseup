import * as admin from 'firebase-admin';
admin.initializeApp({
  projectId: 'staging-clockwork',
});

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { RegisterRoutes } from '../build/routes';
import * as openapi from '../build/swagger.json';

import {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from 'express';
import { ValidateError } from 'tsoa';

export const app = express();

const port = process.env.PORT || 3001;

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

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
});

app.listen(port, () =>
  console.log(
    `CourseUp Functions (Express) app listening at http://localhost:${port}`
  )
);
