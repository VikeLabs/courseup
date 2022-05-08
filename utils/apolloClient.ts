import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  // TODO: change depending on environment
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});
