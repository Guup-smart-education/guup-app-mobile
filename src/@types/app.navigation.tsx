import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {EProfileType} from './../@enum/profile.type';
import {Post} from './../graphql/types.d';

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
    post?: Post;
  };
  GuupClassRoom: {
    id?: string;
  };
  // TODO: Verifify if is necessary
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
// Route base app
export type AppScreenRouteProp = RouteProp<RootApp, 'GuupExplorer'>;
// Tree route app
export type CourseScreenRouteProp = RouteProp<RootApp, 'GuupCourse'>;
export type CourseDetailScreenRouteProp = RouteProp<
  RootApp,
  'GuupCourseDetail'
>;
export type NewsScreenRouteProp = RouteProp<RootApp, 'GuupNews'>;
export type ProfileScreenRouteProp = RouteProp<RootApp, 'GuupUserProfile'>;
export type CommentScreenRouteProp = RouteProp<RootApp, 'GuupComments'>;
export type ClassRoomScreenRouteProp = RouteProp<RootApp, 'GuupClassRoom'>;

// Navigation base app
export type AppScreenNavigationProp = StackNavigationProp<
  RootApp,
  'GuupExplorer'
>;
// Tree navigation app
export type CourseScreenNavigationProp = StackNavigationProp<
  RootApp,
  'GuupCourse'
>;
export type CourseDetailScreenNavigationProp = StackNavigationProp<
  RootApp,
  'GuupCourseDetail'
>;
export type NewsScreenNavigationProp = StackNavigationProp<RootApp, 'GuupNews'>;
export type ProfileScreenNavigationProp = StackNavigationProp<
  RootApp,
  'GuupUserProfile'
>;
export type CommentScreenNavigationProp = StackNavigationProp<
  RootApp,
  'GuupComments'
>;
export type ClassRoomScreenNavigationProp = StackNavigationProp<
  RootApp,
  'GuupClassRoom'
>;

// Props base app
export type PropsApp = {
  route: AppScreenRouteProp;
  navigation: AppScreenNavigationProp;
};
// Tree props app
export type CoursePropsApp = {
  route: CourseScreenRouteProp;
  navigation: CourseScreenNavigationProp;
};
export type CourseDetailPropsApp = {
  route: CourseDetailScreenRouteProp;
  navigation: CourseDetailScreenNavigationProp;
};
export type NewsPropsApp = {
  route: NewsScreenRouteProp;
  navigation: NewsScreenNavigationProp;
};
export type ProfilePropsApp = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};
export type CommentPropsApp = {
  route: CommentScreenRouteProp;
  navigation: CommentScreenNavigationProp;
};
export type ClassRoomPropsApp = {
  route: ClassRoomScreenRouteProp;
  navigation: ClassRoomScreenNavigationProp;
};
