import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {EProfileType} from './../@enum/profile.type';
import {EViewMode} from './../@enum/view.mode';
import {Post} from './../graphql/types.d';

export enum EApp {
  'GuupExplorer' = 'GuupExplorer',
  'GuupCollectionDetail' = 'GuupCollectionDetail',
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
  GuupCollectionDetail: {
    mode?: keyof typeof EViewMode;
  };
  GuupCollectionCreate: undefined;
  GuupContentCreate:
    | {
        path?: string;
      }
    | undefined;
  GuupNews: undefined;
  GuupAccount: undefined;
  GuupNotifications: undefined;
  GuupSettings: undefined;
  GuupUserProfile: {
    type?: keyof typeof EProfileType;
  };
  GuupCollections: undefined;
  GuupEditCollection: {
    id?: string;
  };
  GuupCourses: undefined;
  GuupPosts: undefined;
  GuupPostCreate: undefined;
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
export type CollectionCreateScreenRouteProp = RouteProp<
  RootApp,
  'GuupCollectionCreate'
>;
export type ContentCreateScreenRouteProp = RouteProp<
  RootApp,
  'GuupContentCreate'
>;
export type CollectionDetailScreenRouteProp = RouteProp<
  RootApp,
  'GuupCollectionDetail'
>;
export type NewsScreenRouteProp = RouteProp<RootApp, 'GuupNews'>;
export type ProfileScreenRouteProp = RouteProp<RootApp, 'GuupUserProfile'>;
export type AccountScreenRouteProp = RouteProp<RootApp, 'GuupAccount'>;
export type CommentScreenRouteProp = RouteProp<RootApp, 'GuupComments'>;
export type ClassRoomScreenRouteProp = RouteProp<RootApp, 'GuupClassRoom'>;
export type EditCollectionScreenRouteProp = RouteProp<
  RootApp,
  'GuupEditCollection'
>;

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
  'GuupCollectionDetail'
>;
export type CollectionCreateScreenNavigationProp = StackNavigationProp<
  RootApp,
  'GuupCollectionCreate'
>;
export type ContentCreateScreenNavigationProp = StackNavigationProp<
  RootApp,
  'GuupContentCreate'
>;
export type NewsScreenNavigationProp = StackNavigationProp<RootApp, 'GuupNews'>;
export type AccountScreenNavigationProp = StackNavigationProp<
  RootApp,
  'GuupAccount'
>;
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
export type EditCollectionScreenNavigationProp = StackNavigationProp<
  RootApp,
  'GuupEditCollection'
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
export type CollectionDetailPropsApp = {
  route: CollectionDetailScreenRouteProp;
  navigation: CourseDetailScreenNavigationProp;
};
export type CollectionCreatePropsApp = {
  route: CollectionCreateScreenRouteProp;
  navigation: CollectionCreateScreenNavigationProp;
};
export type ContentCreatePropsApp = {
  route: ContentCreateScreenRouteProp;
  navigation: ContentCreateScreenNavigationProp;
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
export type EditCollectionPropsApp = {
  route: EditCollectionScreenRouteProp;
  navigation: EditCollectionScreenNavigationProp;
};