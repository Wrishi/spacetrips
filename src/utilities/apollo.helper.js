import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT });

const authLink = new ApolloLink((operation, forward) => {
  const token = process.env.REACT_APP_GRAPHQL_APIKEY
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });
  return forward(operation);
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});