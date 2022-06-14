import { KualiCourse, NestedPreCoRequisites } from 'lib/fetchers';

// If stuff is string, return it
// If not, get string of NestedPreCoRequisites or KualiCourse
export function myFunction(req: string | NestedPreCoRequisites | KualiCourse): String {
  if (typeof req === 'string') {
    return req;
    // It's nested
  } else if ('reqList' in req) {
    return nestedReq(req);
  } else if ('code' in req) {
    return req.subject + req.code;
  }
  return 'Failed';
}

// TODO: Figure out how to display the individual items one by one. Returning just cuts it off and shows once
// Once that is done, can add a case for when coreq == true
// Add some stuff for quantity
// Hyperlinks for the courses
export function nestedReq(req: NestedPreCoRequisites): String {
  var i = 0;
  var out = '';
  if (req.reqList !== undefined) {
    while (req.reqList[i] !== undefined) {
      out += myFunction(req.reqList[i]) + ' ';
      i += 1;
    }
  }
  return out;
}

export type RequisiteProp = {
  preAndCorequisites?: (string | NestedPreCoRequisites | KualiCourse)[];
  preOrCorequisites?: (string | NestedPreCoRequisites | KualiCourse)[];
};

export function Requisites({ preAndCorequisites, preOrCorequisites }: RequisiteProp) {
  return (
    <div>
      <p>Requisites</p>
      <li>
        {preAndCorequisites?.map((req) => {
          if (typeof req === 'string') {
            return req;
          }
          return myFunction(req);
        })}
        {preOrCorequisites?.map((req) => {
          if (typeof req === 'string') {
            return req;
          }
          return myFunction(req);
        })}
      </li>
    </div>
  );
}
