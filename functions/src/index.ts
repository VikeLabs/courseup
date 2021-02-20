import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  ClassScheduleListing,
  DetailedClassInformation, KualiCourseCatalog,
} from "@isaaccormack/uvic-course-scraper/dist/src/types";
import { assertCourseParamsExist, assertMethod, assertTermValid, FALL_2020, SPRING_2021 } from "./assert";
import { sendInternalError, sendRequestParamError } from "./error";
const { UVicCourseScraper } = require('@isaaccormack/uvic-course-scraper');

const serviceAccount = require("../staging-clockwork-firebase-adminsdk-ozs4e-ebe3a28fd5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://helloworld-6776d-default-rtdb.firebaseio.com",
});

/**
 * Gets all courses
 */
export const getAllCourses = functions.https.onRequest(async (req, res) => {
  if (!assertMethod(res, "GET", req.method)) { return; }

  try {
    res.send(await UVicCourseScraper.getAllCourses());
  } catch (err) {
    sendInternalError(res, err);
  }
});

/**
 * Gets a course details given its pid
 */
export const getCourseDetails = functions.https.onRequest(async (req, res) => {
  if (!assertMethod(res, "POST", req.method)) { return; }

  const pid = req.body.pid as string;

  if (!pid) {
    sendRequestParamError(res, 'pid');
    return;
  }

  try {
    res.send(await UVicCourseScraper.getCourseDetails(pid));
  } catch (err) {
    sendInternalError(res, err);
  }
});

/**
 * Gets the sections for a course given its term, subject, and code (ie. '202009', 'CSC', '225')
 */
export const getCourseSections = functions.https.onRequest(async (req, res) => {
  if (!assertMethod(res, "POST", req.method)) { return; }

  const { term, subject, code, exists } = assertCourseParamsExist(req, res);
  if (!exists) { return; }

  if (!assertTermValid(res, term)) { return; }

  try {
    const courseSections: ClassScheduleListing[] = await UVicCourseScraper.getCourseSections(term, subject, code);
    res.send(courseSections ? courseSections : "No sections found for " + subject + code + " in " + term);
  } catch (err) {
    sendInternalError(res, err);
  }
});

/**
 * Gets a mapping of sections to seats for a course given its term, subject, and code
 */
export const getCourseSeats = functions.https.onRequest(async (req, res) => {
  if (!assertMethod(res, "POST", req.method)) { return; }

  const { term, subject, code, exists } = assertCourseParamsExist(req, res);
  if (!exists) { return; }

  if (!assertTermValid(res, term)) { return; }

  let snapshot;
  try {
    snapshot = await admin.database().ref("/" + term + "/" + subject + code).get();

    if (!snapshot.exists()) {
      res.send('No seats for course ' + subject + ' ' + code +' in ' + term);
      return;
    }
  } catch(err) {
    functions.logger.error('Could not get CRN from database');
    sendInternalError(res, err);
    return;
  }

  try {
    const crnToSeatsMap: DetailedClassInformation[] = await Promise.all(
      snapshot.val().map(async (crn: any) => {
        const details: DetailedClassInformation = await UVicCourseScraper.getSectionSeats(term, crn);
        return {crn, ...details};
      })
    );
    res.send(crnToSeatsMap);
  } catch(err) {
    functions.logger.error('Could not get sections seats from API');
    sendInternalError(res, err);
  }
});

/**
 * Updates the map of courses -> CRNs in the database. Done for each available term.
 *   ie. a mapping from term, subject, and code -> CRNs for all sections of that course
 */
export const updateCRNMap = functions.pubsub.schedule('every monday 00:00').onRun(async (context) => {
  functions.logger.info('Updating CRN Map');

  const rootRef = admin.database().ref();
  const fallRef = rootRef.child(FALL_2020);
  const springRef = rootRef.child(SPRING_2021);
  try {
    const courses: KualiCourseCatalog[] = await UVicCourseScraper.getAllCourses();
    await Promise.all(
      courses.map(async (course) => {
        // parse courseCatalogId into subject and code
        const subjectLength = course.subjectCode.name.length;
        const subject = course.__catalogCourseId.slice(0, subjectLength);
        const code = course.__catalogCourseId.slice(subjectLength);

        const fallCourseSections: ClassScheduleListing[] = await UVicCourseScraper.getCourseSections(FALL_2020, subject, code);
        await fallRef.update({ [course.__catalogCourseId]: fallCourseSections.map((section) => section.crn) })
        const springCourseSections: ClassScheduleListing[] = await UVicCourseScraper.getCourseSections(SPRING_2021, subject, code);
        await springRef.update({ [course.__catalogCourseId]: springCourseSections.map((section) => section.crn) })
      })
    );
  } catch (err) {
    functions.logger.error(err);
  }
});