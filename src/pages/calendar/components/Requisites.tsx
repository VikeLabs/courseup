import { KualiCourse, NestedPreCoRequisites } from 'lib/fetchers';

// If stuff is string, return it as a jsx element
// If not, get NestedPreCoRequisites or KualiCourse
export function myFunction(req: string | NestedPreCoRequisites | KualiCourse): JSX.Element {
  if (typeof req === 'string') {
    return <>{req}</>;
  } else if ('reqList' in req) {
    const nestedReqs = nestedReq(req);
    return (
      <>
        Complete {req.quantity?.toString()} of the following:
        <br />
        {nestedReqs.map((r, i) => (
          <>
            {r}
            {i < nestedReqs.length - 1 && <br />}
          </>
        ))}
      </>
    );
  } else if ('code' in req) {
    return <>{req.subject + req.code}</>;
  }
  return <></>;
}

export function nestedReq(req: NestedPreCoRequisites): JSX.Element[] {
  if (req.reqList !== undefined) {
    return req.reqList.map((r) => myFunction(r));
  }
  return [];
}

export type RequisiteProp = {
  preAndCorequisites?: (string | NestedPreCoRequisites | KualiCourse)[];
  preOrCorequisites?: (string | NestedPreCoRequisites | KualiCourse)[];
};

//"Complete {quantity} of the following:"
//If its of type kualicourse, then its a course object with a code, subject and sometimes required grade
export function Requisites({ preAndCorequisites, preOrCorequisites }: RequisiteProp) {
  return (
    <div>
      {preAndCorequisites && (
        <>
          <p>Prerequisites</p>
          {preAndCorequisites.map((req) => myFunction(req))}
        </>
      )}
      {preOrCorequisites && (
        <>
          <p>Pre or Corequisites</p>
          {preOrCorequisites.map((req) => myFunction(req))}
        </>
      )}
    </div>
  );
}
