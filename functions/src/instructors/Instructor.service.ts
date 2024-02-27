import got from 'got';
import { RMP_AUTH_TOKEN, RMP_GRAPHQL_URL, RMP_UVIC_ID } from '../constants';

const profRatingQuery = `
    query GetProfRating($schoolID: ID!, $name: String!) {
        newSearch {
            teachers(query: { schoolID: $schoolID, text: $name }) {
                edges {
                    node {
                        avgRatingRounded
                    }
                }
            }
        }
    }
`;

export async function getInstructorRating(
  name: string
): Promise<number | null> {
  // strip out (P) from the instructor's name
  name = name.replace('(P)', '').trim();
  const response = (await got.post(RMP_GRAPHQL_URL, {
    json: {
      query: profRatingQuery,
      variables: {
        schoolID: RMP_UVIC_ID,
        name,
      },
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${RMP_AUTH_TOKEN}`,
    },
    responseType: 'json',
  })) as any;

  if (response.body.data.newSearch.teachers.edges.length === 0) {
    return null;
  }

  return response.body.data.newSearch.teachers.edges[0].node.avgRatingRounded;
}
