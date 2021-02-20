import { sendRequestParamError } from './error';

export const FALL_2020 = '202009';
export const SPRING_2021 = '202101';

export const assertCourseParamsExist = (req: any, res: any): any => {
  const params = {
    term: req.body.term as string,
    subject: req.body.subject as string,
    code: req.body.code as string,
    exists: true,
  };

  if (!params.term) {
    params.exists = false;
    sendRequestParamError(res, 'term');
  } else if (!params.subject) {
    params.exists = false;
    sendRequestParamError(res, 'subject');
  } else if (!params.code) {
    params.exists = false;
    sendRequestParamError(res, 'code');
  }
  return params;
};

export const assertMethod = (
  res: any,
  expected: string,
  method: string
): boolean => {
  if (expected !== method) {
    res.sendStatus(405);
    return false;
  }
  return true;
};

export const assertTermValid = (res: any, term: string): boolean => {
  const validTerms = [FALL_2020, SPRING_2021];
  if (!validTerms.includes(term)) {
    res
      .status(400)
      .send(
        'Request Error: Term is invalid, please request a term in [' +
          validTerms +
          ']'
      );
    return false;
  }
  return true;
};
