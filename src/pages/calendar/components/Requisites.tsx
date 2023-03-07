import { useState, useEffect } from 'react';

import { Box, Divider, ListItem, Link, Text, UnorderedList } from '@chakra-ui/react';

import { KualiCourse, NestedPreCoRequisites } from 'lib/fetchers';

// Based on the nested info in the requisite, display the element necessary
export function displayRequirement(
  req: string | NestedPreCoRequisites | KualiCourse,
  indentationLevel: number = 1
): JSX.Element {
  // If its just a string, display it. Eg. "or permission from the department"
  if (typeof req === 'string') {
    return <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>{req}</ListItem>;
    // If there's a quantity, then we have a list of requisites to display
  } else if ('quantity' in req) {
    //Then it is a NestedPreCoRequisite
    const reqs = nestedReq(req);
    if (req.coreq) {
      return (
        <Box>
          {req.quantity && ( // If all are required, it doesn't get displayed
            <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>
              Completed or currently enrolled in {req.quantity} of:{' '}
            </ListItem>
          )}
          {req.grade && (
            <>
              <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>
                Earn a minimum grade of {req.grade} in each of:
              </ListItem>
            </>
          )}
          {reqs.map((r) => displayRequirement(r, indentationLevel + 1))}{' '}
          {/* Ensure to increase the indentation level for nested elements */}
        </Box>
      );
    } else {
      return (
        <Box>
          {req.quantity &&
            !req.grade &&
            indentationLevel === 1 && ( // Displays this only when its not a grade requirement, and is at the lowest indentation level
              <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>
                Complete {req.quantity} of the following:{' '}
              </ListItem>
            )}
          {req.quantity &&
            !req.grade &&
            indentationLevel !== 1 && ( // Displays this only when its not a grade requirement
              <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>Complete {req.quantity} of: </ListItem>
            )}
          {req.grade && (
            <>
              <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>
                Earn a minimum grade of {req.grade} in each of the following:
              </ListItem>
            </>
          )}
          {reqs.map((r) => displayRequirement(r, indentationLevel + 1))}{' '}
          {/* Ensure to increase the indentation level for nested elements */}
        </Box>
      );
    }
  } else if ('reqListItemst' in req) {
    const nestedReqs = nestedReq(req);
    return <Box>{nestedReqs}</Box>; // Displays the list of requisites
  } else if ('code' in req) {
    // Get the current term and the URL
    const url = window.location.href;
    const currTerm = url.split('calendar/')[1].split('/')[0];

    // Get course details from the backend
    const courseDetails = GetCourseDetails(currTerm, req.subject, req.code) as unknown as {
      pid: string;
      title: string;
      credits: {
        chosen: string;
        value:
          | string
          | {
              max: string;
              min: string;
            };
        credits: {
          max: string;
          min: string;
        };
      };
    };

    // If course details are not available, return basic info
    if (!courseDetails) {
      return <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>{`${req.subject} ${req.code}`}</ListItem>;
    } else {
      // Extract course details and format credits
      const pid = courseDetails.pid;
      const link = `${url.split('?pid=')[0]}?pid=${pid}`;
      const credits = courseDetails.credits.credits;
      const creditsVisual = credits.min === credits.max ? `(${credits.max})` : `(${credits.min} - ${credits.max})`;

      // Render course details with a hyperlink to requisite course page
      // Unsure how to do this like the other components linking to different pages smoothly
      return (
        <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>
          <Text>
            <Link color="blue.500" href={link}>
              {`${req.subject} ${req.code}`}
            </Link>
            {` - ${courseDetails.title} `}
            {`${creditsVisual}`}
          </Text>
        </ListItem>
      );
    }
  }
  return <></>;
}

// Used to fetch course details necessary for requisites (pid, title, credits)
// Should (probably) be moved elsewhere
function GetCourseDetails(term: string, subject: string, code: string) {
  // Use state to store course details
  const [courseDetails, setCourseDetails] = useState(null);

  // Use effect to fetch course details from the API when the component mounts
  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        // Fetch course details from the backend
        const response = await fetch(`https://courseup.vikelabs.dev/api/courses/${term}/${subject}/${code}`);
        if (!response.ok) {
          console.log('Failed to fetch course details');
          return null;
        }
        // Parse the response as JSON and set course details in state
        const data = await response.json();
        setCourseDetails(data);
      } catch (error) {
        console.log('Failed to fetch course details');
        return null;
      }
    }
    fetchCourseDetails();
  }, [code, subject, term]);

  return courseDetails;
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
          {/* call the displayRequirement for each prerequisite */}
          {preAndCorequisites.map((req) => (
            <Box>
              <UnorderedList>{displayRequirement(req)}</UnorderedList>
            </Box>
          ))}
        </Box>
      )}
      {/* if preOrCorequisites are provided, render them with a heading */}
      {preOrCorequisites && (
        <Box>
          Pre Or Corequisites
          <Divider />
          {/* call the displayRequirement for each prerequisite */}
          {preOrCorequisites.map((req) => (
            <Box>
              <UnorderedList>{displayRequirement(req)}</UnorderedList>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
