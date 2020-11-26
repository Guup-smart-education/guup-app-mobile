import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export enum EAuth {
  'AuthSignIn' = 'AuthSignIn',
  'AuthOnboarding' = 'AuthOnboarding',
  'AuthSignUp' = 'AuthSignUp',
  'AuthAccess' = 'AuthAccess',
  'AuthWaiting' = 'AuthWaiting',
}

export type RootAuth = {
  AuthSignIn: undefined;
  AuthOnboarding: undefined;
  AuthSignUp: undefined;
  AuthAccess: {
    email: string;
    expireIn: number | null | undefined;
    token?: string;
  };
  AuthWaiting: {
    image?: Blob;
    title?: string;
    description?: string;
    actionBack?: () => void;
  };
};

export type AuthScreenRouteProp = RouteProp<RootAuth, 'AuthAccess'>;

export type AuthScreenNavigationProp = StackNavigationProp<
  RootAuth,
  'AuthWaiting'
>;

export type PropsAuth = {
  route: AuthScreenRouteProp;
  navigation: AuthScreenNavigationProp;
};
