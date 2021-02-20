// eslint-disable-next-line @typescript-eslint/no-var-requires
const functions = require('firebase-functions');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const admin = require('firebase-admin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const test = require('firebase-functions-test')();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sinon = require('sinon');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chai = require('chai');
const assert = chai.assert;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { UVicCourseScraper } = require('@isaaccormack/uvic-course-scraper');

describe('Cloud Functions', () => {
  const term = '202009';
  const subject = 'CSC';
  const code = '111';

  const mockCourses = [
    {
      pid: 'abcdefg',
      __catalogCourseId: 'CSC225',
      subjectCode: {
        name: 'CSC',
      },
    },
    {
      pid: 'hijklmno',
      __catalogCourseId: 'AMAN337',
      subjectCode: {
        name: 'AMAN',
      },
    },
  ];

  const mockCourseSections = [
    {
      crn: '10000',
      sectionCode: 'A01',
      additionalNotes: 'hello',
    },
    {
      crn: '10001',
      sectionCode: 'A02',
      additionalNotes: 'world',
    },
  ];

  let myFunctions, adminInitStub;
  before(() => {
    functions.logger.info = sinon.stub();
    functions.logger.error = sinon.stub();

    adminInitStub = sinon.stub(admin, 'initializeApp');
    myFunctions = require('../lib/index');
  });

  after(() => {
    functions.logger.info.reset();
    functions.logger.error.reset();

    adminInitStub.restore();
    test.cleanup();
  });

  describe('getAllCourses', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });
    afterEach(() => {
      sandbox.restore();
    });

    it('should return all courses', (done) => {
      const mockCourses = [
        {
          pid: 'abcdefg',
          id: '123456',
          title: 'Math',
        },
        {
          pid: 'qwerty',
          id: '098765',
          title: 'Art',
        },
      ];

      sandbox.stub(UVicCourseScraper, 'getAllCourses').returns(mockCourses);
      const req = { method: 'GET' };
      const res = {
        send: (courses) => {
          assert.deepEqual(courses, mockCourses);
          done();
        },
      };

      myFunctions.getAllCourses(req, res);
    });

    it('should return error message on internal error', async (done) => {
      sandbox.stub(UVicCourseScraper, 'getAllCourses').throws();
      const req = { method: 'GET' };

      let res = {
        status: (code) => ({
          send: (message) => {
            assert.equal(code, 500);
            assert.isTrue(message.indexOf('Internal Error') > -1);
            done();
          },
        }),
      };

      myFunctions.getAllCourses(req, res);
    });

    it('should only allow GET method', (done) => {
      const req = { method: 'POST' };
      const res = {
        sendStatus: (code) => {
          assert.equal(code, 405);
          done();
        },
      };

      myFunctions.getAllCourses(req, res);
    });
  });

  describe('getCourseDetails', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });
    afterEach(() => {
      sandbox.restore();
    });

    it('should return details for a course', (done) => {
      const pid = 'SkMkeY6XV';
      const mockCourseDetails = {
        pid,
        id: '123456',
        title: 'Math',
      };

      sinon
        .stub(UVicCourseScraper, 'getCourseDetails')
        .returns(mockCourseDetails);
      const req = { method: 'POST', body: { pid } };
      const res = {
        send: (courseDetails) => {
          assert.equal(courseDetails, mockCourseDetails);
          done();
        },
      };

      myFunctions.getCourseDetails(req, res);
    });
  });

  describe('getCourseSections', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });
    afterEach(() => {
      sandbox.restore();
    });

    it('should return all sections for a course', (done) => {
      sinon
        .stub(UVicCourseScraper, 'getCourseSections')
        .returns(mockCourseSections);
      const req = { method: 'POST', body: { term, subject, code } };
      const res = {
        send: (courseSections) => {
          assert.deepEqual(courseSections, mockCourseSections);
          done();
        },
      };

      myFunctions.getCourseSections(req, res);
    });

    it('should throw request error if term is missing in request', (done) => {
      const req = { method: 'POST', body: { term, subject } };
      const res = {
        status: (code) => ({
          send: (message) => {
            assert.equal(code, 400);
            assert.isTrue(message.indexOf('Request Error') > -1);
            done();
          },
        }),
      };

      myFunctions.getCourseSections(req, res);
    });

    it('should throw request error if term is invalid', (done) => {
      const req = { method: 'POST', body: { term: '202008', subject, code } };
      const res = {
        status: (code) => ({
          send: (message) => {
            assert.equal(code, 400);
            assert.isTrue(message.indexOf('Request Error') > -1);
            done();
          },
        }),
      };

      myFunctions.getCourseSections(req, res);
    });
  });

  describe('getCourseSeats', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });
    afterEach(() => {
      sandbox.restore();
    });

    it('should return seats for all sections of course', (done) => {
      const CRNs = [1, 2, 3];
      const refParam = '/' + term + '/' + subject + code;
      const databaseStub = sinon.stub();
      const refStub = sinon.stub();
      const getStub = sinon.stub();

      Object.defineProperty(admin, 'database', { get: () => databaseStub });
      databaseStub.returns({ ref: refStub });
      refStub.withArgs(refParam).returns({ get: getStub });
      getStub.returns(
        Promise.resolve({
          exists: () => {
            return true;
          },
          val: () => {
            return CRNs;
          },
        })
      );

      const mockSeats = {
        seats: 1,
        waitListSeats: 2,
      };
      const mockSeatMapping = CRNs.map((crn) => ({ crn, ...mockSeats }));

      sandbox.stub(UVicCourseScraper, 'getSectionSeats').returns(mockSeats);

      const req = { method: 'POST', body: { term, subject, code } };
      const res = {
        send: (seatMapping) => {
          assert.deepEqual(seatMapping, mockSeatMapping);
          done();
        },
      };

      myFunctions.getCourseSeats(req, res);
    });
  });
});
