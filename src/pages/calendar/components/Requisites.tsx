import { Box, Text, Divider, ListItem, Skeleton, UnorderedList } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { KualiCourse, NestedPreCoRequisites, GetCourseDetails, Term } from 'lib/fetchers';
import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';
import { getCurrentTerm } from 'lib/utils/terms';

// Based on the nested info in the requisite, display the element necessary
export function DisplayRequirement(
  req: string | NestedPreCoRequisites | KualiCourse,
  indentationLevel: number = 1
): JSX.Element {
  // Grab the current term
  const currTerm = useSessionStorage('user:term', getCurrentTerm())[0] as Term;

  // If its just a string, display it. Eg. "or permission from the department"
  if (typeof req === 'string') {
    return (
      <UnorderedList>
        <ListItem title="Requisite" style={{ marginLeft: `${indentationLevel * 40}px` }}>
          {req}
        </ListItem>
      </UnorderedList>
    );
    // If there's a quantity, then we have a list of requisites to display
  } else if ('quantity' in req) {
    //Then it is a NestedPreCoRequisite
    const reqs = nestedReq(req);
    if (req.coreq) {
      return (
        <Box>
          {req.quantity && ( // If all are required, it doesn't get displayed
            <UnorderedList>
              <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>
                Completed or currently enrolled in {req.quantity} of:{' '}
              </ListItem>
            </UnorderedList>
          )}
          {req.grade && (
            <UnorderedList>
              <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>
                Earn a minimum grade of {req.grade} in each of:
              </ListItem>
            </UnorderedList>
          )}
          {reqs.map((r) => DisplayRequirement(r, indentationLevel + 1))}{' '}
          {/* Ensure to increase the indentation level for nested elements */}
        </Box>
      );
    } else {
      return (
        <Box>
          {req.quantity &&
            !req.grade &&
            indentationLevel === 1 && ( // Displays this only when its not a grade requirement, and is at the lowest indentation level
              <UnorderedList>
                <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>
                  Complete {req.quantity} of the following:{' '}
                </ListItem>
              </UnorderedList>
            )}
          {req.quantity &&
            !req.grade &&
            indentationLevel !== 1 && ( // Displays this only when its not a grade requirement
              <UnorderedList>
                <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>Complete {req.quantity} of: </ListItem>
              </UnorderedList>
            )}
          {req.grade && (
            <UnorderedList>
              <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>
                Earn a minimum grade of {req.grade} in each of the following:
              </ListItem>
            </UnorderedList>
          )}
          {reqs.map((r) => DisplayRequirement(r, indentationLevel + 1))}{' '}
          {/* Ensure to increase the indentation level for nested elements */}
        </Box>
      );
    }
  } else if ('reqListItems' in req) {
    const nestedReqs = nestedReq(req);
    return <Box>{nestedReqs}</Box>; // Displays the list of requisites
  } else if ('code' in req) {
    // Get the current term and requisite details
    const subject = req.subject;
    const code = req.code;

    // Get course details from the backend
    return (
      <GetCourseDetails term={currTerm} subject={req.subject} code={req.code}>
        {(courseDetails, isLoading) => {
          // If its loading then render a skeleton
          if (isLoading.loading) {
            return (
              <UnorderedList>
                <ListItem style={{ marginLeft: `${indentationLevel * 40}px`, marginRight: `100px` }}>
                  <Skeleton>
                    <Text>Loading course details...</Text>
                  </Skeleton>
                </ListItem>
              </UnorderedList>
            );
          } else if (courseDetails) {
            // Extract course details and format credits
            const pid = courseDetails.pid;
            const credits = courseDetails.credits.credits;
            const creditsVisual =
              credits.min === credits.max ? `(${credits.max})` : `(${credits.min} - ${credits.max})`;

            // Render course details with a hyperlink to requisite course page on courseup
            return (
              <UnorderedList>
                <ListItem title={`${subject} ${code}`} style={{ marginLeft: `${indentationLevel * 40}px` }}>
                  <Text _hover={{ color: 'blue.600' }} color="blue.400" as="span">
                    <Link to={`/calendar/${currTerm}/${subject}?pid=${pid}`}>{`${subject} ${code}`}</Link>
                  </Text>
                  {` - ${courseDetails.title} ${creditsVisual}`}
                </ListItem>
              </UnorderedList>
            );
          } else {
            // Render default state
            return (
              <UnorderedList>
                <ListItem
                  title={`${subject} ${code}`}
                  style={{ marginLeft: `${indentationLevel * 40}px` }}
                >{`${subject} ${code}`}</ListItem>
              </UnorderedList>
            );
          }
        }}
      </GetCourseDetails>
    );
  }
  return <></>;
}

// Get nested reqs from NestedPreCoRequisites object
export function nestedReq(req: NestedPreCoRequisites): Array<string | NestedPreCoRequisites | KualiCourse> {
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
    <Box>
      {/* if preAndCorequisites are provided, render them with a heading */}
      {preAndCorequisites && (
        <Box>
          Prerequisites
          <Divider />
          {/* call the DisplayRequirement for each prerequisite */}
          {preAndCorequisites.map((req) => (
            <Box>
              <UnorderedList>{DisplayRequirement(req)}</UnorderedList>
            </Box>
          ))}
        </Box>
      )}
      {/* if preOrCorequisites are provided, render them with a heading */}
      {preOrCorequisites && (
        <Box>
          Pre Or Corequisites
          <Divider />
          {/* call the DisplayRequirement for each prerequisite */}
          {preOrCorequisites.map((req) => (
            <Box>
              <UnorderedList>{DisplayRequirement(req)}</UnorderedList>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
