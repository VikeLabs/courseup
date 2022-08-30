import { KualiCourse, NestedPreCoRequisites } from 'lib/fetchers';

function flatten(arr: any[]): string {
  return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), []);
}

// If stuff is string, return it
// If not, get string of NestedPreCoRequisites or KualiCourse
export function myFunction(req: string | NestedPreCoRequisites | KualiCourse): string[] {
  var out: string[] = [];
  if (typeof req === 'string') {
    out.push(req);
    return out;
    // It's nested
  } else if ('reqList' in req) {
    out.push('Complete ' + req.quantity?.toString() + ' of the following: ');
    nestedReq(req).forEach((element) => {
      out.push(flatten(element));
    });
    return out;
  } else if ('code' in req) {
    out.push(req.subject + req.code);
    return out;
  }
  return out;
}

// TODO: Figure out how to display the individual items one by one. Returning just cuts it off and shows once
// Once that is done, can add a case for when coreq == true
// Add some stuff for quantity
// Hyperlinks for the courses
export function nestedReq(req: NestedPreCoRequisites): string[][] {
  var i = 0;
  var out = [];
  if (req.reqList !== undefined) {
    while (req.reqList[i] !== undefined) {
      // var nested = myFunction(req.reqList[i]);
      // while (i <= nested.length) {
      //   out[i] = nested[i - 1];
      //   i += 1;
      // }
      out[i] = myFunction(req.reqList[i]);
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
      <p>
        {preAndCorequisites ? <p>Prerequisites</p> : null}
        {preAndCorequisites?.map((req) => {
          if (typeof req === 'string') {
            return <li>{req}</li>;
          } else {
            // var list = myFunction(req);
            // var str = document.createElement('ul');
            // for (var i in list) {
            //   var anchor = document.createElement('a');
            //   anchor.href = '#';
            //   anchor.innerText = list[i];

            //   var elem = document.createElement('li');
            //   elem.appendChild(anchor);
            //   str.appendChild(elem);
            // }
            return req;
          }
          // return <li className="Container" dangerouslySetInnerHTML={{ __html: myFunction(req) }}></li>;
        })}
      </p>
      <p>
        {preOrCorequisites ? <p>Pre or Corequisites</p> : null}
        {preOrCorequisites?.map((req) => {
          if (typeof req === 'string') {
            return <li>{req}</li>;
          } else {
            // var list = myFunction(req);
            // var str = document.createElement('ul');
            // for (var i in list) {
            //   var anchor = document.createElement('a');
            //   anchor.href = '#';
            //   anchor.innerText = list[i];

            //   var elem = document.createElement('li');
            //   elem.appendChild(anchor);
            //   str.appendChild(elem);
            // }
            return req;
          }
        })}
      </p>
    </div>
  );
}
