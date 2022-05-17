import { KualiCourse, NestedPreCoRequisites } from 'lib/fetchers';

// If stuff is string, return it
// If not, get string of NestedPreCoRequisites or KualiCourse
// export function (string | NestedPreCoRequisites | KualiCourse) myFunction(req: string | NestedPreCoRequisites | KualiCourse) {
//   if (typeof req === 'string') {
//     return req;
//   } else if (req === 'NestedPreCoRequisites') {
//     if (req.reqList) {
//       return myFunction(req.reqList[0]);
//     } else {
//       <div>req.quantity + " of the following:"</div>;
//     }
//   } else if (req === 'KualiCourse') {
//     return <div>req.subject</div>;
//   }
//   return <div>{'Hey ' + req}</div>;
// }

// Return input if it is of type string
export function myFunction(
  req: string | NestedPreCoRequisites | KualiCourse | Element
): string | NestedPreCoRequisites | Element {
  if (typeof req === 'string') {
    return req;
  } else if (req.code != null || false) {
    // If it has the reqList property, call the function
    return;
  }
  return <div>"test"</div>;
}

export type RequisiteProp = {
  preAndCorequisites?: (string | NestedPreCoRequisites | KualiCourse)[];
  preOrCorequisites?: (string | NestedPreCoRequisites | KualiCourse)[];
};

export function Requisites({ preAndCorequisites, preOrCorequisites }: RequisiteProp) {
  return (
    <div>
      {preAndCorequisites?.map((req) => {
        console.log(req);
        return myFunction(req);
      })}
      {preOrCorequisites?.map((req) => {
        console.log(req);
        return myFunction(req);
      })}
    </div>
  );
}
