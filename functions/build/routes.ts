/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
  HttpStatusCodeLiteral,
  TsoaResponse,
} from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CoursesController } from './../src/courses/Course.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventsController } from './../src/events/Event.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SectionsController } from './../src/sections/Section.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SubjectsController } from './../src/subjects/Subject.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TextbooksController } from './../src/textbooks/Textbook.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TimetablesController } from './../src/timetables/Timetable.controller';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  Course: {
    dataType: 'refObject',
    properties: {
      pid: { dataType: 'string', required: true },
      title: { dataType: 'string', required: true },
      subject: { dataType: 'string', required: true },
      code: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Term: {
    dataType: 'refAlias',
    type: {
      dataType: 'union',
      subSchemas: [
        { dataType: 'enum', enums: ['202001'] },
        { dataType: 'enum', enums: ['202005'] },
        { dataType: 'enum', enums: ['202009'] },
        { dataType: 'enum', enums: ['202101'] },
        { dataType: 'enum', enums: ['202105'] },
        { dataType: 'enum', enums: ['202109'] },
        { dataType: 'enum', enums: ['202201'] },
        { dataType: 'enum', enums: ['202205'] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  NestedPreCoRequisites: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        reqList: {
          dataType: 'array',
          array: {
            dataType: 'union',
            subSchemas: [
              { ref: 'NestedPreCoRequisites' },
              { ref: 'KualiCourse' },
              { dataType: 'string' },
            ],
          },
        },
        unparsed: { dataType: 'string' },
        gpa: { dataType: 'string' },
        grade: { dataType: 'string' },
        units: { dataType: 'boolean' },
        coreq: { dataType: 'boolean' },
        quantity: {
          dataType: 'union',
          subSchemas: [
            { dataType: 'double' },
            { dataType: 'enum', enums: ['ALL'] },
          ],
        },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  KualiCourse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        pid: { dataType: 'string' },
        code: { dataType: 'string', required: true },
        subject: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CourseDetails: {
    dataType: 'refObject',
    properties: {
      pid: { dataType: 'string', required: true },
      title: { dataType: 'string', required: true },
      description: { dataType: 'string', required: true },
      dateStart: { dataType: 'string', required: true },
      credits: {
        dataType: 'nestedObjectLiteral',
        nestedProperties: {
          chosen: { dataType: 'string', required: true },
          value: {
            dataType: 'union',
            subSchemas: [
              { dataType: 'string' },
              {
                dataType: 'nestedObjectLiteral',
                nestedProperties: {
                  max: { dataType: 'string', required: true },
                  min: { dataType: 'string', required: true },
                },
              },
            ],
            required: true,
          },
          credits: {
            dataType: 'nestedObjectLiteral',
            nestedProperties: {
              max: { dataType: 'string', required: true },
              min: { dataType: 'string', required: true },
            },
            required: true,
          },
        },
        required: true,
      },
      hoursCatalog: {
        dataType: 'array',
        array: {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            lab: { dataType: 'string', required: true },
            tutorial: { dataType: 'string', required: true },
            lecture: { dataType: 'string', required: true },
          },
        },
      },
      preAndCorequisites: {
        dataType: 'array',
        array: {
          dataType: 'union',
          subSchemas: [
            { dataType: 'string' },
            { ref: 'NestedPreCoRequisites' },
            { ref: 'KualiCourse' },
          ],
        },
      },
      preOrCorequisites: {
        dataType: 'array',
        array: {
          dataType: 'union',
          subSchemas: [
            { dataType: 'string' },
            { ref: 'NestedPreCoRequisites' },
            { ref: 'KualiCourse' },
          ],
        },
      },
      subject: { dataType: 'string', required: true },
      code: { dataType: 'string', required: true },
      formally: { dataType: 'string' },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  EventRequest: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: { name: { dataType: 'string', required: true } },
      additionalProperties: { dataType: 'any' },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  levelType: {
    dataType: 'refAlias',
    type: {
      dataType: 'union',
      subSchemas: [
        { dataType: 'enum', enums: ['law'] },
        { dataType: 'enum', enums: ['undergraduate'] },
        { dataType: 'enum', enums: ['graduate'] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  sectionType: {
    dataType: 'refAlias',
    type: {
      dataType: 'union',
      subSchemas: [
        { dataType: 'enum', enums: ['lecture'] },
        { dataType: 'enum', enums: ['lab'] },
        { dataType: 'enum', enums: ['tutorial'] },
        { dataType: 'enum', enums: ['gradable lab'] },
        { dataType: 'enum', enums: ['lecture topic'] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  MeetingTimes: {
    dataType: 'refObject',
    properties: {
      type: { dataType: 'string', required: true },
      time: { dataType: 'string', required: true },
      days: { dataType: 'string', required: true },
      where: { dataType: 'string', required: true },
      dateRange: { dataType: 'string', required: true },
      scheduleType: { dataType: 'string', required: true },
      instructors: {
        dataType: 'array',
        array: { dataType: 'string' },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ClassScheduleListing: {
    dataType: 'refObject',
    properties: {
      title: { dataType: 'string', required: true },
      crn: { dataType: 'string', required: true },
      sectionCode: { dataType: 'string', required: true },
      additionalNotes: { dataType: 'string' },
      associatedTerm: {
        dataType: 'nestedObjectLiteral',
        nestedProperties: {
          end: { dataType: 'string', required: true },
          start: { dataType: 'string', required: true },
        },
        required: true,
      },
      registrationDates: {
        dataType: 'nestedObjectLiteral',
        nestedProperties: {
          end: { dataType: 'string', required: true },
          start: { dataType: 'string', required: true },
        },
        required: true,
      },
      levels: {
        dataType: 'array',
        array: { dataType: 'refAlias', ref: 'levelType' },
        required: true,
      },
      campus: {
        dataType: 'union',
        subSchemas: [
          { dataType: 'enum', enums: ['online'] },
          { dataType: 'enum', enums: ['in-person'] },
        ],
        required: true,
      },
      sectionType: { ref: 'sectionType', required: true },
      instructionalMethod: { dataType: 'string', required: true },
      credits: { dataType: 'string', required: true },
      meetingTimes: {
        dataType: 'array',
        array: { dataType: 'refObject', ref: 'MeetingTimes' },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Section: {
    dataType: 'refAlias',
    type: { ref: 'ClassScheduleListing', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Seating: {
    dataType: 'refObject',
    properties: {
      capacity: { dataType: 'double', required: true },
      actual: { dataType: 'double', required: true },
      remaining: { dataType: 'double', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  classification: {
    dataType: 'refAlias',
    type: {
      dataType: 'union',
      subSchemas: [
        { dataType: 'enum', enums: ['YEAR_1'] },
        { dataType: 'enum', enums: ['YEAR_2'] },
        { dataType: 'enum', enums: ['YEAR_3'] },
        { dataType: 'enum', enums: ['YEAR_4'] },
        { dataType: 'enum', enums: ['YEAR_5'] },
        { dataType: 'enum', enums: ['unclassified'] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Requirements: {
    dataType: 'refObject',
    properties: {
      level: {
        dataType: 'array',
        array: { dataType: 'refAlias', ref: 'levelType' },
        required: true,
      },
      fieldOfStudy: { dataType: 'array', array: { dataType: 'string' } },
      classification: {
        dataType: 'array',
        array: { dataType: 'refAlias', ref: 'classification' },
      },
      negClassification: {
        dataType: 'array',
        array: { dataType: 'refAlias', ref: 'classification' },
      },
      degree: { dataType: 'array', array: { dataType: 'string' } },
      program: { dataType: 'array', array: { dataType: 'string' } },
      negProgram: { dataType: 'array', array: { dataType: 'string' } },
      college: { dataType: 'array', array: { dataType: 'string' } },
      negCollege: { dataType: 'array', array: { dataType: 'string' } },
      major: { dataType: 'array', array: { dataType: 'string' } },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Seat: {
    dataType: 'refObject',
    properties: {
      title: { dataType: 'string', required: true },
      seats: { ref: 'Seating', required: true },
      waitListSeats: { ref: 'Seating', required: true },
      requirements: { ref: 'Requirements' },
      crn: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  KualiSubject: {
    dataType: 'refObject',
    properties: {
      subject: { dataType: 'string', required: true },
      title: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Subject: {
    dataType: 'refAlias',
    type: { ref: 'KualiSubject', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ExtendedTextbook: {
    dataType: 'refObject',
    properties: {
      instructor: { dataType: 'string' },
      isbn: { dataType: 'string' },
      price: {
        dataType: 'nestedObjectLiteral',
        nestedProperties: {
          newAndDigitalAccessCad: { dataType: 'string' },
          digitalAccessCad: { dataType: 'string' },
          usedCad: { dataType: 'string' },
          newCad: { dataType: 'string' },
        },
        required: true,
      },
      required: { dataType: 'boolean', required: true },
      authors: { dataType: 'array', array: { dataType: 'string' } },
      title: { dataType: 'string', required: true },
      imageUrl: { dataType: 'string' },
      bookstoreUrl: { dataType: 'string' },
      amazonUrl: { dataType: 'string' },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CourseTextbook: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        textbooks: {
          dataType: 'array',
          array: { dataType: 'refObject', ref: 'ExtendedTextbook' },
          required: true,
        },
        instructor: { dataType: 'string' },
        additionalInfo: { dataType: 'array', array: { dataType: 'string' } },
        section: { dataType: 'string' },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TextbookInfo: {
    dataType: 'refObject',
    properties: {
      subject: { dataType: 'string', required: true },
      code: { dataType: 'string', required: true },
      term: { dataType: 'string', required: true },
      sections: {
        dataType: 'array',
        array: { dataType: 'refAlias', ref: 'CourseTextbook' },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TimetableCourse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        color: {
          dataType: 'string',
          required: true,
          validators: { pattern: { value: '^#(?:[0-9a-fA-F]{3}){1,2}$' } },
        },
        tutorial: {
          dataType: 'array',
          array: { dataType: 'string' },
          validators: { pattern: { value: '^T\\d{2}$' } },
        },
        lab: {
          dataType: 'array',
          array: { dataType: 'string' },
          validators: { pattern: { value: '^B\\d{2}$' } },
        },
        lecture: {
          dataType: 'array',
          array: { dataType: 'string' },
          validators: { pattern: { value: '^A\\d{2}$' } },
        },
        pid: { dataType: 'string', required: true },
        code: { dataType: 'string', required: true },
        subject: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Timetable: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        courses: {
          dataType: 'array',
          array: { dataType: 'refAlias', ref: 'TimetableCourse' },
          required: true,
        },
        term: { ref: 'Term', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TimetableReturn: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { slug: { dataType: 'string', required: true } },
        },
        { ref: 'Timetable' },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ValidateErrorJSON: {
    dataType: 'refObject',
    properties: {
      message: {
        dataType: 'enum',
        enums: ['Validation failed'],
        required: true,
      },
      details: {
        dataType: 'nestedObjectLiteral',
        nestedProperties: {},
        additionalProperties: { dataType: 'any' },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Pick_Timetable.courses-or-term_': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        courses: {
          dataType: 'array',
          array: { dataType: 'refAlias', ref: 'TimetableCourse' },
          required: true,
        },
        term: { ref: 'Term', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TimetableParams: {
    dataType: 'refAlias',
    type: { ref: 'Pick_Timetable.courses-or-term_', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.get(
    '/courses/:term',

    function CoursesController_getCourses(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        term: { in: 'path', name: 'term', required: true, ref: 'Term' },
        in_session: {
          default: false,
          in: 'query',
          name: 'in_session',
          dataType: 'boolean',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CoursesController();

        const promise = controller.getCourses.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/courses/:term/:pid',

    function CoursesController_getCourse(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        pid: { in: 'path', name: 'pid', required: true, dataType: 'string' },
        term: { in: 'path', name: 'term', required: true, ref: 'Term' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CoursesController();

        const promise = controller.getCourse.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/courses/:term/:subject/:code',

    function CoursesController_getCourseDetails(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        term: { in: 'path', name: 'term', required: true, ref: 'Term' },
        subject: {
          in: 'path',
          name: 'subject',
          required: true,
          dataType: 'string',
        },
        code: { in: 'path', name: 'code', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CoursesController();

        const promise = controller.getCourseDetails.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/events',

    function EventsController_postEvent(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        requestBody: {
          in: 'body',
          name: 'requestBody',
          required: true,
          ref: 'EventRequest',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new EventsController();

        const promise = controller.postEvent.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/sections/:term',

    function SectionsController_sections(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        term: { in: 'path', name: 'term', required: true, ref: 'Term' },
        subject: {
          in: 'query',
          name: 'subject',
          required: true,
          dataType: 'string',
        },
        code: { in: 'query', name: 'code', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new SectionsController();

        const promise = controller.sections.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/sections/:term/seats',

    function SectionsController_seats(request: any, response: any, next: any) {
      const args = {
        term: { in: 'path', name: 'term', required: true, ref: 'Term' },
        subject: {
          in: 'query',
          name: 'subject',
          required: true,
          dataType: 'string',
        },
        code: { in: 'query', name: 'code', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new SectionsController();

        const promise = controller.seats.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/subjects/:term',

    function SubjectsController_subjects(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        term: { in: 'path', name: 'term', required: true, ref: 'Term' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new SubjectsController();

        const promise = controller.subjects.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/textbooks/:term/:subject/:code',

    function TextbooksController_getTextbooks(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        term: { in: 'path', name: 'term', required: true, ref: 'Term' },
        subject: {
          in: 'path',
          name: 'subject',
          required: true,
          dataType: 'string',
        },
        code: { in: 'path', name: 'code', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TextbooksController();

        const promise = controller.getTextbooks.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/timetables/:slug',

    function TimetablesController_getTimetable(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        slug: { in: 'path', name: 'slug', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TimetablesController();

        const promise = controller.getTimetable.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/timetables',

    function TimetablesController_createTimetable(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        requestBody: {
          in: 'body',
          name: 'requestBody',
          required: true,
          ref: 'TimetableParams',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TimetablesController();

        const promise = controller.createTimetable.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return (
      'getHeaders' in object && 'getStatus' in object && 'setStatus' in object
    );
  }

  function promiseHandler(
    controllerObj: any,
    promise: any,
    response: any,
    successStatus: any,
    next: any
  ) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode = successStatus;
        let headers;
        if (isController(controllerObj)) {
          headers = controllerObj.getHeaders();
          statusCode = controllerObj.getStatus() || statusCode;
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        returnHandler(response, statusCode, data, headers);
      })
      .catch((error: any) => next(error));
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function returnHandler(
    response: any,
    statusCode?: number,
    data?: any,
    headers: any = {}
  ) {
    if (response.headersSent) {
      return;
    }
    Object.keys(headers).forEach((name: string) => {
      response.set(name, headers[name]);
    });
    if (
      data &&
      typeof data.pipe === 'function' &&
      data.readable &&
      typeof data._read === 'function'
    ) {
      data.pipe(response);
    } else if (data !== null && data !== undefined) {
      response.status(statusCode || 200).json(data);
    } else {
      response.status(statusCode || 204).end();
    }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function responder(
    response: any
  ): TsoaResponse<HttpStatusCodeLiteral, unknown> {
    return function (status, data, headers) {
      returnHandler(response, status, data, headers);
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, request: any, response: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return validationService.ValidateParam(
            args[key],
            request.query[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'path':
          return validationService.ValidateParam(
            args[key],
            request.params[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'header':
          return validationService.ValidateParam(
            args[key],
            request.header(name),
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'body':
          return validationService.ValidateParam(
            args[key],
            request.body,
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'body-prop':
          return validationService.ValidateParam(
            args[key],
            request.body[name],
            name,
            fieldErrors,
            'body.',
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'formData':
          if (args[key].dataType === 'file') {
            return validationService.ValidateParam(
              args[key],
              request.file,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          } else if (
            args[key].dataType === 'array' &&
            args[key].array.dataType === 'file'
          ) {
            return validationService.ValidateParam(
              args[key],
              request.files,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          } else {
            return validationService.ValidateParam(
              args[key],
              request.body[name],
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          }
        case 'res':
          return responder(response);
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, '');
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
