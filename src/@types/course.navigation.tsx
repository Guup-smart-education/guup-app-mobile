import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export enum EApp {
  'GuupCourseDetail' = 'GuupCourseDetail',
}

export type RootApp = {
  GuupCourseDetail: undefined;
  GuupCourseCheckout: undefined;
};

export type AppScreenRouteProp = RouteProp<RootApp, 'GuupCourseDetail'>;

export type AppScreenNavigationProp = StackNavigationProp<
  RootApp,
  'GuupCourseDetail'
>;

export type PropsApp = {
  route: AppScreenRouteProp;
  navigation: AppScreenNavigationProp;
};
