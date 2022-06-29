import { KualiCourse, NestedPreCoRequisites } from 'lib/fetchers';

// If stuff is string, return it
// If not, get string of NestedPreCoRequisites or KualiCourse
export function myFunction(req: string | NestedPreCoRequisites | KualiCourse): string {
  if (typeof req === 'string') {
    return req;
    // It's nested
  } else if ('reqList' in req) {
    return req.quantity?.toString() + ' of the following: ' /*need to indent*/ + nestedReq(req);
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
      out = out + '<li>' + myFunction(req.reqList[i]) + '</li>';
      i += 1;
    }
  }
  return out;
}

export type RequisiteProp = {
  preAndCorequisites?: (string | NestedPreCoRequisites | KualiCourse)[];
  preOrCorequisites?: (string | NestedPreCoRequisites | KualiCourse)[];
};

//"Complete {quantity} of the following:"
//If its of type kualicourse, then its a course object with a code, subject and sometimes required grade
export function Requisites({ preAndCorequisites, preOrCorequisites }: RequisiteProp) {
  //console.log(preAndCorequisites);
  //console.log(preOrCorequisites);
  return (
    <div>
      <ul>
        {preAndCorequisites ? <p>Prerequisites</p> : null}
        {preAndCorequisites?.map((req) => {
          if (typeof req === 'string') {
            return <li>{req}</li>;
          }
          return <div className="Container" dangerouslySetInnerHTML={{ __html: myFunction(req) }}></div>;
        })}
      </ul>
      <ul>
        {preOrCorequisites ? <p>Pre or Corequisites</p> : null}
        {preOrCorequisites?.map((req) => {
          if (typeof req === 'string') {
            return <li>{req}</li>;
          }
          return <div className="Container" dangerouslySetInnerHTML={{ __html: myFunction(req) }}></div>;
        })}
      </ul>
    </div>
  );
}
