import * as functions from 'firebase-functions';

export const sendRequestParamError = (res: any, param: string): void => {
  res
    .status(400)
    .send('Request Error: Request is missing query parameter: ' + param);
};

export const sendInternalError = (res: any, err: any): void => {
  functions.logger.error(err);
  res.status(500).send('Internal Error: Could not process request');
};
