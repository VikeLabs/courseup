import { KualiCourse, NestedPreCoRequisites } from 'lib/fetchers';

// If stuff is string, return it
// If not, get string of NestedPreCoRequisites or KualiCourse
export function myFunction(
  req: string | NestedPreCoRequisites | KualiCourse
): string | NestedPreCoRequisites | KualiCourse {
  if (typeof req === 'string') {
    return req;
  }
  // } else if (req === 'NestedPreCoRequisites') {
  //   if (req.reqList) {
  //     return myFunction(req.reqList[0]);
  //   } else {
  //     req.quantity + ' of the following:';
  //   }
  // } else if (req === 'KualiCourse') {
  //   return req.subject;
  // }
  return 'Hey ' + req;
}

export type RequisiteProp = {
  preAndCorequisites?: (string | NestedPreCoRequisites | KualiCourse)[];
  preOrCorequisites?: (string | NestedPreCoRequisites | KualiCourse)[];
};

export function Requisites({ preAndCorequisites, preOrCorequisites }: RequisiteProp) {
  return (
    <div>
      {preAndCorequisites?.map((req) => {
        return myFunction(req);
      })}
      {preOrCorequisites?.map((req) => {
        return myFunction(req);
      })}
    </div>
  );
}
