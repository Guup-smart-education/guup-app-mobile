import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import AsyncStorage from '@react-native-community/async-storage';

// Http Link connection
const httpLink = createHttpLink({
  uri: 'http://localhost:8090/graphql',
  credentials: 'same-origin',
});

// Middleware
const authMiddleware = setContext(async (_, {headers}) => {
  const storageToken = await AsyncStorage.getItem('@GUUPAuth:token');
  return {
    headers: {
      ...headers,
      authorization: storageToken ? `Guup ${storageToken}` : null,
    },
  };
});

const error = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) =>
      console.log(
        `☠️[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([error, authMiddleware, httpLink]),
});
