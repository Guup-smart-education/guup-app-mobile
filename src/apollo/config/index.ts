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

const paginationPolicy = () => ({
  merge(existing: any[], incoming: any[]) {
    const merged = [...(incoming || [])];
    return merged;
  },
  read(existing: any[]) {
    return existing;
  },
});

export const client = new ApolloClient({
  link: from([error, authMiddleware, httpLink]),
  cache: new InMemoryCache({
    resultCaching: true,
    typePolicies: {
      GetPosts: {
        queryType: true,
        keyFields: ['allPost'],
        fields: {
          allPost: paginationPolicy(),
        },
      },
    },
  }),
});
