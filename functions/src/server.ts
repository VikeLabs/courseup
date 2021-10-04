import * as admin from 'firebase-admin';
import * as fs from 'fs';

admin.initializeApp({
  projectId: 'development',
});

const term = '202109';
const dir = 'tmp/firestore';

import * as express from 'express';
import { Response as ExResponse, Request as ExRequest } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../build/routes';
import * as openapi from '../build/swagger.json';
import { CoursesService } from './courses/Course.service';
import { Term } from './constants';
import { rateLimiterMiddleware } from './middlewares/rateLimiter/rateLimiter';
import { IRateLimiterOptions, RateLimiterMemory } from 'rate-limiter-flexible';

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

if (process.env.ENABLE_RATE_LIMITER) {
  const options: IRateLimiterOptions = {
    points: 10,
    duration: 1, // per 1 second by IP
  };
  const rateLimiter = new RateLimiterMemory(options);
  app.use(rateLimiterMiddleware(rateLimiter));
}

RegisterRoutes(app);

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
