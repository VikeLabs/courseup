import { KualiCourse, NestedPreCoRequisites } from 'lib/fetchers';
import './requisites.css';

// Based on the nested info in the requisite, display the element necessary
export function myFunction(
  req: string | NestedPreCoRequisites | KualiCourse,
  indentationLevel: number = 1
): JSX.Element {
  // If its just a string, display it. Eg. "or permission from the department"
  if (typeof req === 'string') {
    return <li style={{ marginLeft: `${indentationLevel * 40}px` }}>{req}</li>;
    // If there's a quanity, then we have a list of requisites to display
  } else if ('quantity' in req) {
    const reqs = nestedReq(req, 0); // 0 indicates there are no indentation levels
    if (req.coreq && req.coreq === true) {
      return (
        <div>
          {req.quantity && ( // If all are required, it doesn't get displayed
            <li style={{ marginLeft: `${indentationLevel * 40}px` }}>
              Completed or currently enrolled in {req.quantity} of the following:{' '}
            </li>
          )}
          {req.grade && (
            <>
              <li style={{ marginLeft: `${indentationLevel * 40}px` }}>
                Earn a minimum grade of {req.grade} in each of the following:
              </li>
            </>
          )}
          {reqs.map((r) => myFunction(r, indentationLevel + 1))}{' '}
          {/* Ensure to increase the indentation level for nested elements */}
        </div>
      );
    }
    return (
      <div>
        {req.quantity && ( // If all are required, it doesn't get displayed
          <li style={{ marginLeft: `${indentationLevel * 40}px` }}>Complete {req.quantity} of the following: </li>
        )}
        {req.grade && (
          <>
            <li style={{ marginLeft: `${indentationLevel * 40}px` }}>
              Earn a minimum grade of {req.grade} in each of the following:
            </li>
          </>
        )}
        {reqs.map((r) => myFunction(r, indentationLevel + 1))}{' '}
        {/* Ensure to increase the indentation level for nested elements */}
      </div>
    );
  } else if ('reqList' in req) {
    const nestedReqs = nestedReq(req, 0);
    return <div>{nestedReqs}</div>; // Displays the list of requisites
  } else if ('code' in req) {
    return <li style={{ marginLeft: `${indentationLevel * 40}px` }}>{req.subject + ' ' + req.code}</li>; // Display the course and code
  }
  return <></>;
}

// Get nested reqs from NestedPreCoRequisites object
export function nestedReq(req: NestedPreCoRequisites
): Array<string | NestedPreCoRequisites | KualiCourse> {
  if (req.reqList !== undefined) {
    return req.reqList;
  }
  return [];
}

// Defines the properties of the Requisites component;
// an array of strings, NestedPreCoRequisites and KualiCourse
export type RequisiteProp = {
  preAndCorequisites?: (string | NestedPreCoRequisites | KualiCourse)[];
  preOrCorequisites?: (string | NestedPreCoRequisites | KualiCourse)[];
};

// Renders the prerequisites and corequisites as a JSX element
export function Requisites({ preAndCorequisites, preOrCorequisites }: RequisiteProp) {
  return (
    <div>
      {/* if preAndCorequisites are provided, render them with a heading */}
      {preAndCorequisites && (
        <div>
          <p>Prerequisites</p>
          <hr />
          {/* call the myFunction for each prerequisite */}
          {preAndCorequisites.map((req) => (
            <div>{myFunction(req)}</div>
          ))}
        </div>
      )}
      {/* if preOrCorequisites are provided, render them with a heading */}
      {preOrCorequisites && (
        <div>
          <p>Pre Or Corequisites</p>
          <hr />
          {/* call the myFunction for each prerequisite */}
          {preOrCorequisites.map((req) => (
            <div>{myFunction(req)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
