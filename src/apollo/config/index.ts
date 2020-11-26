import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  defaultDataIdFromObject,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';

// Http Link connection
const httpLink = createHttpLink({
  // uri: `${Config.API_URL}`,
  uri: 'http://192.168.15.78:4000/graphql', // IP: Home
  // uri: 'http://172.16.204.98:4000/graphql', // IP: Qsaude
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
    // const merged = [...(existing || []), ...(incoming || [])];
    return merged;
  },
  read(existing: any[]) {
    return existing;
  },
});

export const client = new ApolloClient({
  link: from([error, authMiddleware, httpLink]),
  cache: new InMemoryCache({
    // resultCaching: true,
    addTypename: true,
    dataIdFromObject: (responseObject) => {
      switch (responseObject.__typename) {
        case 'GetPaths':
        case 'GetCourses':
        case 'GetPosts':
        case 'GetCoursesByPath':
        case 'GetComment':
        case 'GetCoursesByOwner':
        case 'GetPostsOwner':
          return 'Query';
        default:
          return defaultDataIdFromObject(responseObject);
      }
    },
    typePolicies: {
      Query: {
        queryType: true,
        keyFields: ['allPaths', 'allPost', 'coursesByPath', 'comments'],
        fields: {
          allPost: paginationPolicy(),
          allPostOwner: paginationPolicy(),
          allPaths: paginationPolicy(),
          courses: paginationPolicy(),
          coursesByPath: paginationPolicy(),
          coursesByOnwer: paginationPolicy(),
          comments: paginationPolicy(),
        },
      },
      // GetPosts: {
      //   // queryType: true,
      //   keyFields: ['allPost'],
      //   fields: {
      //     allPost: paginationPolicy(),
      //   },
      // },
      // GetPaths: {
      //   queryType: true,
      //   keyFields: ['allPaths'],
      //   fields: {
      //     allPaths: paginationPolicy(),
      //   },
      // },
      // PageContent: {
      //   queryType: true,
      //   keyFields: ['allPaths', 'allPost'],
      //   fields: {
      //     allPost: paginationPolicy(),
      //     allPaths: paginationPolicy(),
      //   },
      // },
    },
  }),
});
