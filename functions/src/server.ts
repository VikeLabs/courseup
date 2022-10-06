import * as admin from 'firebase-admin';
import * as fs from 'fs';

admin.initializeApp({
  projectId: 'development',
});

const term = '202209';
const dir = 'tmp/firestore';

import * as express from 'express';
import { Response as ExResponse, Request as ExRequest } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../build/routes';
import * as openapi from '../build/swagger.json';
import { CoursesService } from './courses/Course.service';
import { Term } from './constants';

import { validationErrorHandler } from './middlewares/dataValidation';

export const app = express();

const port = process.env.PORT || 3001;

// Use body parser to read sent json payloads
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// TODO: only use if testing this middleware otherwise we don't want to rate limit during development.

// TODO: can probably accomplish the same thing using hosting.
// serve the OpenAPI spec.
app.get('/openapi.json', async (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openapi);
});

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(openapi));
});

RegisterRoutes(app);

app.use(validationErrorHandler);

const main = async () => {
  if (!fs.existsSync(dir)) {
    console.log(
      `Unable to find Firestore data in ${dir}. Seeding database for ${term}...`
    );
    fs.mkdirSync(dir, { recursive: true });
    await CoursesService.populateCourses(term as Term);
  } else {
    console.log('Found Firestore data. Skipping database seeding.');
    console.log(
      `Delete "${dir}" (using "rm -rf tmp/dir") to re-run the database seeding.`
    );
    console.log(
      `or run "FIRESTORE_EMULATOR_HOST=localhost:8080 npm run db:populate <term>"`
    );
  }

  app.listen(port, () =>
    console.log(
      `CourseUp Functions (Express) app listening at http://localhost:${port}`
    )
  );
};

main();
