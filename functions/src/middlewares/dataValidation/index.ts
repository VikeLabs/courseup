import { Response as ExResponse, Request as ExRequest } from 'express';
import * as express from 'express';
import { ValidateError } from '@tsoa/runtime';

export function validationErrorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: express.NextFunction
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
}
