import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {EProfileType} from './../@enum/profile.type';

export enum EApp {
  'GuupExplorer' = 'GuupExplorer',
  'GuupCourseDetail' = 'GuupCourseDetail',
  'GuupCourse' = 'GuupCourse',
  'GuupNews' = 'GuupNews',
  'GuupUserProfile' = 'GuupUserProfile',
  'GuupComments' = 'GuupComments',
  'GuupClassRoom' = 'GuupClassRoom',
  'GuupClassModule' = 'GuupClassModule',
  'GuupClassVideo' = 'GuupClassVideo',
  'GuupClassArticle' = 'GuupClassArticle',
}

export type RootApp = {
  GuupExplorer: undefined;
  GuupCourse: undefined;
  GuupCourseDetail: {
    id?: string;
  };
  GuupNews: undefined;
  GuupUserProfile: {
    type?: keyof typeof EProfileType;
  };
  GuupComments: {
    id?: string;
  };
  GuupClassRoom: {
    id?: string;
  };
  GuupClassModule: {
    id?: string;
  };
  GuupClassVideo: {
    id?: string;
  };
  GuupClassArticle: {
    id?: string;
  };
};

export type AppScreenRouteProp = RouteProp<RootApp, 'GuupExplorer'>;

export type AppScreenNavigationProp = StackNavigationProp<
  RootApp,
  'GuupExplorer'
>;

export type PropsApp = {
  route: AppScreenRouteProp;
  navigation: AppScreenNavigationProp;
};
