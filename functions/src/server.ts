import * as admin from 'firebase-admin';
import * as fs from 'fs';

admin.initializeApp({
  projectId: 'development',
});

const term = '202109';
const dir = 'tmp/firestore';

const main = async () => {
  console.log('populating database with courses');
  await CoursesService.populateCourses(term as Term);
};

import * as express from 'express';
import { RegisterRoutes } from '../build/routes';
import * as openapi from '../build/swagger.json';
import { CoursesService } from './courses/Course.service';
import { Term } from './constants';

export const app = express();

const port = process.env.PORT || 3001;

// Use body parser to read sent json payloads
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// TODO: can probably accomplish the same thing using hosting.
// serve the OpenAPI spec.
app.get('/openapi.json', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openapi);
});

RegisterRoutes(app);

if (!fs.existsSync(dir) && !process.env.CI) {
  fs.mkdirSync(dir, { recursive: true });

  main();
}

app.listen(port, () =>
  console.log(
    `CourseUp Functions (Express) app listening at http://localhost:${port}`
  )
);
