import { Box, Text, Divider, ListItem, Skeleton, UnorderedList } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { KualiCourse, NestedPreCoRequisites, GetCourseDetails } from 'lib/fetchers';
import { useTerm } from 'lib/hooks/useTerm';

// Based on the nested info in the requisite, display the element necessary
export function DisplayRequirement(
  req: string | NestedPreCoRequisites | KualiCourse,
  indentationLevel: number = 1
): JSX.Element {
  // Grab the current term
  const [currentTerm] = useTerm();

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
    const reqs = req.reqList ?? [];
    const { quantity, grade } = req;
    if (req.coreq) {
      return (
        <Box>
          {quantity && ( // If all are required, it doesn't get displayed
            <UnorderedList>
              <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>
                Completed or currently enrolled in {quantity} of:
              </ListItem>
            </UnorderedList>
          )}
          {grade && (
            <UnorderedList>
              <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>
                Earn a minimum grade of {grade} in each of:
              </ListItem>
            </UnorderedList>
          )}
          {reqs.map((r) => DisplayRequirement(r, indentationLevel + 1))}
          {/* Ensure to increase the indentation level for nested elements */}
        </Box>
      );
    } else {
      return (
        <Box>
          {quantity &&
            !grade &&
            indentationLevel === 1 && ( // Displays this only when its not a grade requirement, and is at the lowest indentation level
              <UnorderedList>
                <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>
                  Complete {quantity} of the following:
                </ListItem>
              </UnorderedList>
            )}
          {quantity &&
            !grade &&
            indentationLevel !== 1 && ( // Displays this only when its not a grade requirement
              <UnorderedList>
                <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>Complete {quantity} of: </ListItem>
              </UnorderedList>
            )}
          {grade && (
            <UnorderedList>
              <ListItem style={{ marginLeft: `${indentationLevel * 40}px` }}>
                Earn a minimum grade of {grade} in each of the following:
              </ListItem>
            </UnorderedList>
          )}
          {reqs.map((r) => DisplayRequirement(r, indentationLevel + 1))}
          {/* Ensure to increase the indentation level for nested elements */}
        </Box>
      );
    }
  } else if ('code' in req) {
    // Get the current term and requisite details
    const { subject, code } = req;

    // Get course details from the backend
    return (
      <GetCourseDetails term={currentTerm} subject={subject} code={code}>
        {(courseDetails, isLoading) => {
          // If its loading then render a skeleton
          if (isLoading.loading) {
            return (
              <UnorderedList>
                <ListItem
                  title={`${subject} ${code}`}
                  style={{ marginLeft: `${indentationLevel * 40}px`, marginRight: `100px` }}
                >
                  <Skeleton>
                    <Text>
                      Loading course details of {subject} {code}
                    </Text>
                  </Skeleton>
                </ListItem>
              </UnorderedList>
            );
          } else if (courseDetails) {
            // Extract course details
            const {
              pid,
              credits: {
                credits: { min, max },
              },
            } = courseDetails;

            const credits = min === max ? `(${max})` : `(${min} - ${max})`;

            // Render course details with a hyperlink to requisite course page on courseup
            return (
              <UnorderedList>
                <ListItem title={`${subject} ${code}`} style={{ marginLeft: `${indentationLevel * 40}px` }}>
                  <Text _hover={{ color: 'blue.600' }} color="blue.400" as="span">
                    <Link to={`/calendar/${currentTerm}/${subject}?pid=${pid}`}>{`${subject} ${code}`}</Link>
                  </Text>
                  {` - ${courseDetails.title} ${credits}`}
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
