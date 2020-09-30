import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum EnumLevels {
  Junior = 'JUNIOR',
  Middle = 'MIDDLE',
  Advance = 'ADVANCE'
}

export enum EnumErrors {
  Empty = 'EMPTY',
  Error = 'ERROR',
  Unknown = 'UNKNOWN',
  InvalidArgument = 'INVALID_ARGUMENT',
  NotFound = 'NOT_FOUND',
  AlreadyExists = 'ALREADY_EXISTS',
  PermissionDenied = 'PERMISSION_DENIED',
  Unauthenticated = 'UNAUTHENTICATED',
  Internal = 'INTERNAL',
  Unavailable = 'UNAVAILABLE'
}

export enum EnumUserRole {
  Master = 'MASTER',
  Admin = 'ADMIN',
  Creator = 'CREATOR',
  Moderator = 'MODERATOR',
  Common = 'COMMON',
  Guest = 'GUEST'
}

export enum EnumPostType {
  Common = 'COMMON',
  Link = 'LINK',
  Video = 'VIDEO'
}

export enum EnumAreas {
  Technology = 'TECHNOLOGY',
  Frontend = 'FRONTEND',
  Backend = 'BACKEND',
  Devos = 'DEVOS',
  Bussines = 'BUSSINES',
  Marketing = 'MARKETING',
  Design = 'DESIGN',
  Ux = 'UX',
  SoftSkills = 'SOFT_SKILLS'
}

export enum EnumKindCourse {
  Free = 'FREE',
  Paytousef = 'PAYTOUSEF'
}

export enum EnumContentType {
  Video = 'VIDEO',
  Article = 'ARTICLE',
  Project = 'PROJECT'
}

export type Success = {
  __typename?: 'Success';
  type?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Error = {
  __typename?: 'Error';
  type?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  error: Error;
};

export type Path = {
  __typename?: 'Path';
  id?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  views?: Maybe<Scalars['Int']>;
  comments?: Maybe<Scalars['Int']>;
  claps?: Maybe<Scalars['Int']>;
  disabled?: Maybe<Scalars['Boolean']>;
  dateCreation?: Maybe<Scalars['String']>;
  owners?: Maybe<Array<Maybe<UserProfile>>>;
  area?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Comments = {
  __typename?: 'Comments';
  id?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  ownerProfile?: Maybe<UserProfile>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type CourseModuleContent = {
  __typename?: 'CourseModuleContent';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CourseModules = {
  __typename?: 'CourseModules';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  progress?: Maybe<Scalars['Int']>;
  numberProjects?: Maybe<Scalars['Int']>;
  numberContent?: Maybe<Scalars['Int']>;
  contentHours?: Maybe<Scalars['Float']>;
  content?: Maybe<Array<Maybe<CourseModuleContent>>>;
};

export type CourseProjects = {
  __typename?: 'CourseProjects';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  contentHours?: Maybe<Scalars['Float']>;
};

export type CourseAchievements = {
  __typename?: 'CourseAchievements';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CoursePrerequisites = {
  __typename?: 'CoursePrerequisites';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CourseGains = {
  __typename?: 'CourseGains';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CourseRatingComments = {
  __typename?: 'CourseRatingComments';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  ownerName?: Maybe<Scalars['String']>;
  ownerRole?: Maybe<Scalars['String']>;
};

export type CourseUser = {
  __typename?: 'CourseUser';
  uid?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  role?: Maybe<EnumUserRole>;
};

export type Course = {
  __typename?: 'Course';
  id?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  videoURL?: Maybe<Scalars['String']>;
  area?: Maybe<Scalars['String']>;
  typeContent?: Maybe<Scalars['String']>;
  difficult?: Maybe<Scalars['String']>;
  viewsCount?: Maybe<Scalars['Float']>;
  clapsCount?: Maybe<Scalars['Float']>;
  commentsCount?: Maybe<Scalars['Float']>;
  comments?: Maybe<Array<Maybe<Comments>>>;
  ownerProfile?: Maybe<UserProfile>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type User = {
  __typename?: 'User';
  uid?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  phoneNumber?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  passwordHash?: Maybe<Scalars['String']>;
  passwordSalt?: Maybe<Scalars['String']>;
  tokensValidAfterTime?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  role?: Maybe<EnumUserRole>;
  profile?: Maybe<UserProfile>;
  skills?: Maybe<Array<Maybe<UserSkill>>>;
  achievements?: Maybe<Array<Maybe<UserAchievement>>>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  uid?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  thumbnailURL?: Maybe<Scalars['String']>;
  profission?: Maybe<Scalars['String']>;
  presentation?: Maybe<Scalars['String']>;
  experience?: Maybe<Scalars['String']>;
};

export type UserSkill = {
  __typename?: 'UserSkill';
  skillName?: Maybe<Scalars['String']>;
  skillLevel?: Maybe<EnumLevels>;
  skillArea?: Maybe<EnumAreas>;
};

export type UserAchievement = {
  __typename?: 'UserAchievement';
  achievement?: Maybe<Scalars['String']>;
  achievementDescription?: Maybe<Scalars['String']>;
};

export type UserPublic = {
  __typename?: 'UserPublic';
  uid?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  role?: Maybe<EnumUserRole>;
};

export type Post = {
  __typename?: 'Post';
  id?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  linkURL?: Maybe<Scalars['String']>;
  viewsCount?: Maybe<Scalars['Float']>;
  commentsCount?: Maybe<Scalars['Float']>;
  clapsCount?: Maybe<Scalars['Float']>;
  comments?: Maybe<Array<Maybe<Comments>>>;
  ownerProfile?: Maybe<UserProfile>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type Review = {
  __typename?: 'Review';
  id?: Maybe<Scalars['String']>;
  course?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  commentary?: Maybe<Scalars['String']>;
  starts?: Maybe<Scalars['Int']>;
  ownerProfile?: Maybe<UserProfile>;
};

export type Company = {
  __typename?: 'Company';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  indetifier?: Maybe<Scalars['String']>;
  members?: Maybe<Scalars['Int']>;
};

export type Jwt = {
  __typename?: 'JWT';
  token?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export enum TypesSignInUsers {
  NewUsers = 'NEW_USERS',
  OldUsers = 'OLD_USERS'
}

export type InputUser = {
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  role: EnumUserRole;
};

export type RequestAccess = {
  __typename?: 'RequestAccess';
  expireIn?: Maybe<Scalars['Int']>;
  success?: Maybe<Success>;
};

export type SigInSuccess = {
  __typename?: 'SigInSuccess';
  access?: Maybe<Jwt>;
  user?: Maybe<UserProfile>;
  success?: Maybe<Success>;
};

export type SuccessAccess = {
  __typename?: 'SuccessAccess';
  type?: Maybe<TypesSignInUsers>;
  message?: Maybe<Scalars['String']>;
};

export type SignUpSuccess = {
  __typename?: 'SignUpSuccess';
  access?: Maybe<Jwt>;
  user?: Maybe<UserProfile>;
  success?: Maybe<Success>;
};

export type MessageError = {
  __typename?: 'MessageError';
  error?: Maybe<Error>;
};

export type URequestAccess = RequestAccess | SigInSuccess | ErrorResponse;

export type USignInResult = SigInSuccess | ErrorResponse;

export type USignUp = SignUpSuccess | ErrorResponse;

export type Query = {
  __typename?: 'Query';
  authQuery?: Maybe<User>;
  getCommentByCourse?: Maybe<UGetComment>;
  getCommentByPost?: Maybe<UGetComment>;
  getAllCompanies?: Maybe<UGetCompanies>;
  getAllCompanyByID?: Maybe<UGetCompany>;
  getCourses?: Maybe<UGetCourses>;
  getCoursesByUser?: Maybe<UGetCourses>;
  getCoursesByPath?: Maybe<UGetCourses>;
  getCourseByID?: Maybe<UGetCourseDetail>;
  getAllPaths?: Maybe<UGetAllPaths>;
  getPathsByOwner?: Maybe<UGetAllPaths>;
  getPathById?: Maybe<UGetPath>;
  getAllPosts?: Maybe<UGetAllPost>;
  getPostsByOwner?: Maybe<UGetAllPost>;
  getPostsById?: Maybe<UGetPost>;
  getReviewByCourse?: Maybe<UGetReview>;
  getReviewByOwner?: Maybe<UGetReview>;
  getUser?: Maybe<UGetUser>;
  getAuthUsers?: Maybe<UGetAllUsers>;
  getAllUsers?: Maybe<UGetAllUsers>;
};


export type QueryAuthQueryArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryGetCommentByCourseArgs = {
  course: Scalars['String'];
};


export type QueryGetCommentByPostArgs = {
  post: Scalars['String'];
};


export type QueryGetAllCompanyByIdArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetCoursesByUserArgs = {
  uid?: Maybe<Scalars['String']>;
};


export type QueryGetCoursesByPathArgs = {
  path?: Maybe<Scalars['String']>;
};


export type QueryGetCourseByIdArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetPathsByOwnerArgs = {
  owner?: Maybe<Scalars['String']>;
};


export type QueryGetPathByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetAllPostsArgs = {
  lastPost?: Maybe<Scalars['String']>;
};


export type QueryGetPostsByOwnerArgs = {
  owner?: Maybe<Scalars['String']>;
};


export type QueryGetPostsByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetReviewByCourseArgs = {
  course: Scalars['String'];
};


export type QueryGetReviewByOwnerArgs = {
  course: Scalars['String'];
  owner?: Maybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  uid?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authRequestAccess: URequestAccess;
  authSignIn: USignInResult;
  authSignUp: USignUp;
  createComment?: Maybe<UPostComment>;
  createCompany?: Maybe<UCreateCompany>;
  updateCourse?: Maybe<UUpdateCourse>;
  createCourse?: Maybe<UCreateCourse>;
  createPath?: Maybe<UCreatePath>;
  createPost?: Maybe<UCreatePost>;
  createReview?: Maybe<UPostReview>;
  createUser?: Maybe<UCreateUser>;
  updateUserProfile?: Maybe<UUpdateProfile>;
};


export type MutationAuthRequestAccessArgs = {
  email: Scalars['String'];
};


export type MutationAuthSignInArgs = {
  email: Scalars['String'];
  tokenAccess: Scalars['Int'];
};


export type MutationAuthSignUpArgs = {
  user?: Maybe<InputUser>;
};


export type MutationCreateCommentArgs = {
  collection: CommentFor;
  comment: IPostComment;
};


export type MutationCreateCompanyArgs = {
  company: ICompany;
};


export type MutationUpdateCourseArgs = {
  course?: Maybe<ICourse>;
};


export type MutationCreateCourseArgs = {
  course?: Maybe<ICourse>;
};


export type MutationCreatePathArgs = {
  path: InputPath;
};


export type MutationCreatePostArgs = {
  post: InputPost;
};


export type MutationCreateReviewArgs = {
  collection: CommentFor;
  review: IPostReview;
};


export type MutationCreateUserArgs = {
  user?: Maybe<InputUser>;
};


export type MutationUpdateUserProfileArgs = {
  user?: Maybe<InputUserProfile>;
};

export enum CommentFor {
  Course = 'COURSE',
  Post = 'POST'
}

export type IPostComment = {
  post: Scalars['String'];
  description: Scalars['String'];
};

export type GetComment = {
  __typename?: 'GetComment';
  comments?: Maybe<Array<Maybe<Comments>>>;
  success?: Maybe<Success>;
};

export type PostComment = {
  __typename?: 'PostComment';
  comment?: Maybe<Comments>;
  success?: Maybe<Success>;
};

export type UGetComment = GetComment | ErrorResponse;

export type UPostComment = PostComment | ErrorResponse;

export type ICompany = {
  name: Scalars['String'];
  domain: Scalars['String'];
  indetifier: Scalars['String'];
};

export type GetCompanies = {
  __typename?: 'GetCompanies';
  companies?: Maybe<Array<Maybe<Company>>>;
  success?: Maybe<Success>;
};

export type GetCompany = {
  __typename?: 'GetCompany';
  company?: Maybe<Company>;
  success?: Maybe<Success>;
};

export type PostCompany = {
  __typename?: 'PostCompany';
  company?: Maybe<Scalars['String']>;
  success?: Maybe<Success>;
};

export type UGetCompanies = GetCompanies | ErrorResponse;

export type UGetCompany = GetCompany | ErrorResponse;

export type UCreateCompany = PostCompany | ErrorResponse;

export type ICourseAchievements = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type ICoursePrerequisites = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type ICourseGains = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type ICourseRatingComments = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  ownerName?: Maybe<Scalars['String']>;
  ownerRole?: Maybe<Scalars['String']>;
};

export type ICourseUser = {
  displayName: Scalars['String'];
  photoURL: Scalars['String'];
  profission: Scalars['String'];
};

export type ICourse = {
  path?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description: Scalars['String'];
  photoURL?: Maybe<Scalars['String']>;
  videoURL?: Maybe<Scalars['String']>;
  area: EnumAreas;
  typeContent: EnumContentType;
  difficult: EnumLevels;
};

export type GetCourses = {
  __typename?: 'GetCourses';
  courses?: Maybe<Array<Maybe<Course>>>;
  success?: Maybe<Success>;
};

export type UpdateCourse = {
  __typename?: 'UpdateCourse';
  course?: Maybe<Course>;
  success?: Maybe<Success>;
};

export type CreateCourse = {
  __typename?: 'CreateCourse';
  createCourse?: Maybe<Scalars['String']>;
  success?: Maybe<Success>;
};

export type GetCourseDetail = {
  __typename?: 'GetCourseDetail';
  course?: Maybe<Course>;
  success?: Maybe<Success>;
};

export type UUpdateCourse = UpdateCourse | ErrorResponse;

export type UCreateCourse = CreateCourse | ErrorResponse;

export type UGetCourses = GetCourses | ErrorResponse;

export type UGetCourseDetail = GetCourseDetail | ErrorResponse;

export type InputPath = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type GetPaths = {
  __typename?: 'GetPaths';
  allPaths?: Maybe<Array<Maybe<Path>>>;
  success?: Maybe<Success>;
};

export type GetPath = {
  __typename?: 'GetPath';
  path?: Maybe<Path>;
  success?: Maybe<Success>;
};

export type CreatePath = {
  __typename?: 'CreatePath';
  createPath?: Maybe<Scalars['String']>;
  success?: Maybe<Success>;
};

export type UGetAllPaths = GetPaths | ErrorResponse;

export type UGetPath = GetPath | ErrorResponse;

export type UCreatePath = CreatePath | ErrorResponse;

export type InputPost = {
  title?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  photoURL?: Maybe<Scalars['String']>;
  linkURL?: Maybe<Scalars['String']>;
};

export type GetPosts = {
  __typename?: 'GetPosts';
  allPost?: Maybe<Array<Maybe<Post>>>;
  success?: Maybe<Success>;
};

export type GetPost = {
  __typename?: 'GetPost';
  post?: Maybe<Post>;
  success?: Maybe<Success>;
};

export type CreatePost = {
  __typename?: 'CreatePost';
  createPost?: Maybe<Post>;
  success?: Maybe<Success>;
};

export type UGetAllPost = GetPosts | ErrorResponse;

export type UGetPost = GetPost | ErrorResponse;

export type UCreatePost = CreatePost | ErrorResponse;

export type IPostReview = {
  post: Scalars['String'];
  commentary?: Maybe<Scalars['String']>;
  starts: Scalars['Int'];
};

export type GetReview = {
  __typename?: 'GetReview';
  reviews?: Maybe<Array<Maybe<Review>>>;
  success?: Maybe<Success>;
};

export type PostReview = {
  __typename?: 'PostReview';
  review?: Maybe<Scalars['String']>;
  success?: Maybe<Success>;
};

export type UGetReview = GetReview | ErrorResponse;

export type UPostReview = PostReview | ErrorResponse;

export type IProfile = {
  displayName?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  profission?: Maybe<Scalars['String']>;
  presentation?: Maybe<Scalars['String']>;
  experience?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
};

export type ISkill = {
  skillName: Scalars['String'];
  skillLevel?: Maybe<EnumLevels>;
};

export type IAchievements = {
  achievement: Scalars['String'];
  achievementDescription?: Maybe<Scalars['String']>;
};

export type InputUserProfile = {
  password?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  profile?: Maybe<IProfile>;
  skills?: Maybe<Array<Maybe<ISkill>>>;
  achievements?: Maybe<Array<Maybe<IAchievements>>>;
};

export type GetUser = {
  __typename?: 'GetUser';
  user?: Maybe<User>;
  success?: Maybe<Success>;
};

export type GetAllUsers = {
  __typename?: 'GetAllUsers';
  allUsers?: Maybe<Array<Maybe<User>>>;
  success?: Maybe<Success>;
};

export type CreateUser = {
  __typename?: 'CreateUser';
  createuser?: Maybe<User>;
  success?: Maybe<Success>;
};

export type UpdateProfile = {
  __typename?: 'UpdateProfile';
  updateprofile?: Maybe<User>;
  success?: Maybe<Success>;
};

export type UGetUser = GetUser | ErrorResponse;

export type UGetAllUsers = GetAllUsers | ErrorResponse;

export type UUpdateProfile = UpdateProfile | ErrorResponse;

export type UCreateUser = CreateUser | ErrorResponse;

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type CreateCommentMutationVariables = Exact<{
  collection: CommentFor;
  post: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment?: Maybe<(
    { __typename?: 'PostComment' }
    & { comment?: Maybe<(
      { __typename?: 'Comments' }
      & Pick<Comments, 'id' | 'owner' | 'description' | 'createdAt'>
      & { ownerProfile?: Maybe<(
        { __typename?: 'UserProfile' }
        & Pick<UserProfile, 'displayName' | 'photoURL' | 'profission'>
      )> }
    )>, success?: Maybe<(
      { __typename?: 'Success' }
      & Pick<Success, 'message'>
    )> }
  ) | (
    { __typename?: 'ErrorResponse' }
    & { error: (
      { __typename?: 'Error' }
      & Pick<Error, 'type' | 'message'>
    ) }
  )> }
);

export type CreatePostMutationVariables = Exact<{
  title?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  photoURL?: Maybe<Scalars['String']>;
  linkURL?: Maybe<Scalars['String']>;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename?: 'CreatePost' }
    & { createPost?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'owner' | 'title' | 'description' | 'photoURL' | 'linkURL' | 'viewsCount' | 'commentsCount' | 'clapsCount' | 'createdAt'>
      & { ownerProfile?: Maybe<(
        { __typename?: 'UserProfile' }
        & Pick<UserProfile, 'displayName' | 'photoURL' | 'profission'>
      )> }
    )>, success?: Maybe<(
      { __typename?: 'Success' }
      & Pick<Success, 'message'>
    )> }
  ) | (
    { __typename?: 'ErrorResponse' }
    & { error: (
      { __typename?: 'Error' }
      & Pick<Error, 'type' | 'message'>
    ) }
  )> }
);

export type AuthRequestAccessMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type AuthRequestAccessMutation = (
  { __typename?: 'Mutation' }
  & { authRequestAccess: (
    { __typename: 'RequestAccess' }
    & Pick<RequestAccess, 'expireIn'>
    & { success?: Maybe<(
      { __typename?: 'Success' }
      & Pick<Success, 'message'>
    )> }
  ) | { __typename: 'SigInSuccess' } | (
    { __typename: 'ErrorResponse' }
    & { error: (
      { __typename?: 'Error' }
      & Pick<Error, 'type' | 'message'>
    ) }
  ) }
);

export type AuthSignInMutationVariables = Exact<{
  email: Scalars['String'];
  tokenAccess: Scalars['Int'];
}>;


export type AuthSignInMutation = (
  { __typename?: 'Mutation' }
  & { authSignIn: (
    { __typename: 'SigInSuccess' }
    & { access?: Maybe<(
      { __typename?: 'JWT' }
      & Pick<Jwt, 'token' | 'refreshToken'>
    )>, user?: Maybe<(
      { __typename?: 'UserProfile' }
      & Pick<UserProfile, 'uid' | 'displayName' | 'photoURL' | 'profission'>
    )>, success?: Maybe<(
      { __typename?: 'Success' }
      & Pick<Success, 'type' | 'message'>
    )> }
  ) | (
    { __typename: 'ErrorResponse' }
    & { error: (
      { __typename?: 'Error' }
      & Pick<Error, 'type' | 'message'>
    ) }
  ) }
);

export type AuthSignUpMutationVariables = Exact<{
  email: Scalars['String'];
  phone: Scalars['String'];
  username: Scalars['String'];
  role: EnumUserRole;
}>;


export type AuthSignUpMutation = (
  { __typename?: 'Mutation' }
  & { authSignUp: (
    { __typename?: 'SignUpSuccess' }
    & { access?: Maybe<(
      { __typename?: 'JWT' }
      & Pick<Jwt, 'token' | 'refreshToken'>
    )>, user?: Maybe<(
      { __typename?: 'UserProfile' }
      & Pick<UserProfile, 'uid' | 'displayName' | 'photoURL' | 'profission' | 'presentation'>
    )>, success?: Maybe<(
      { __typename?: 'Success' }
      & Pick<Success, 'message'>
    )> }
  ) | (
    { __typename?: 'ErrorResponse' }
    & { error: (
      { __typename?: 'Error' }
      & Pick<Error, 'type' | 'message'>
    ) }
  ) }
);

export type GetAllPostsQueryVariables = Exact<{
  lastPost?: Maybe<Scalars['String']>;
}>;


export type GetAllPostsQuery = (
  { __typename?: 'Query' }
  & { getAllPosts?: Maybe<(
    { __typename?: 'GetPosts' }
    & { allPost?: Maybe<Array<Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'owner' | 'title' | 'description' | 'commentsCount' | 'createdAt'>
      & { ownerProfile?: Maybe<(
        { __typename?: 'UserProfile' }
        & Pick<UserProfile, 'displayName' | 'thumbnailURL' | 'profission'>
      )> }
    )>>>, success?: Maybe<(
      { __typename?: 'Success' }
      & Pick<Success, 'message' | 'type'>
    )> }
  ) | (
    { __typename?: 'ErrorResponse' }
    & { error: (
      { __typename?: 'Error' }
      & Pick<Error, 'type' | 'message'>
    ) }
  )> }
);

export type GetCommentByPostQueryVariables = Exact<{
  post: Scalars['String'];
}>;


export type GetCommentByPostQuery = (
  { __typename?: 'Query' }
  & { getCommentByPost?: Maybe<(
    { __typename?: 'GetComment' }
    & { comments?: Maybe<Array<Maybe<(
      { __typename?: 'Comments' }
      & Pick<Comments, 'id' | 'owner' | 'description' | 'createdAt'>
      & { ownerProfile?: Maybe<(
        { __typename?: 'UserProfile' }
        & Pick<UserProfile, 'uid' | 'displayName' | 'thumbnailURL' | 'profission'>
      )> }
    )>>> }
  ) | (
    { __typename?: 'ErrorResponse' }
    & { error: (
      { __typename?: 'Error' }
      & Pick<Error, 'type' | 'message'>
    ) }
  )> }
);


export const CreateCommentDocument = gql`
    mutation createComment($collection: CommentFor!, $post: String!, $description: String!) {
  createComment(collection: $collection, comment: {post: $post, description: $description}) {
    ... on PostComment {
      comment {
        id
        owner
        description
        createdAt
        ownerProfile {
          displayName
          photoURL
          profission
        }
      }
      success {
        message
      }
    }
    ... on ErrorResponse {
      error {
        type
        message
      }
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      collection: // value for 'collection'
 *      post: // value for 'post'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($title: String, $description: String!, $photoURL: String, $linkURL: String) {
  createPost(post: {title: $title, description: $description, photoURL: $photoURL, linkURL: $linkURL}) {
    ... on CreatePost {
      createPost {
        id
        owner
        title
        description
        photoURL
        linkURL
        viewsCount
        commentsCount
        clapsCount
        createdAt
        ownerProfile {
          displayName
          photoURL
          profission
        }
      }
      success {
        message
      }
    }
    ... on ErrorResponse {
      error {
        type
        message
      }
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      photoURL: // value for 'photoURL'
 *      linkURL: // value for 'linkURL'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const AuthRequestAccessDocument = gql`
    mutation authRequestAccess($email: String!) {
  authRequestAccess(email: $email) {
    __typename
    ... on RequestAccess {
      expireIn
      success {
        message
      }
    }
    ... on ErrorResponse {
      error {
        type
        message
      }
    }
  }
}
    `;
export type AuthRequestAccessMutationFn = Apollo.MutationFunction<AuthRequestAccessMutation, AuthRequestAccessMutationVariables>;

/**
 * __useAuthRequestAccessMutation__
 *
 * To run a mutation, you first call `useAuthRequestAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthRequestAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authRequestAccessMutation, { data, loading, error }] = useAuthRequestAccessMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAuthRequestAccessMutation(baseOptions?: Apollo.MutationHookOptions<AuthRequestAccessMutation, AuthRequestAccessMutationVariables>) {
        return Apollo.useMutation<AuthRequestAccessMutation, AuthRequestAccessMutationVariables>(AuthRequestAccessDocument, baseOptions);
      }
export type AuthRequestAccessMutationHookResult = ReturnType<typeof useAuthRequestAccessMutation>;
export type AuthRequestAccessMutationResult = Apollo.MutationResult<AuthRequestAccessMutation>;
export type AuthRequestAccessMutationOptions = Apollo.BaseMutationOptions<AuthRequestAccessMutation, AuthRequestAccessMutationVariables>;
export const AuthSignInDocument = gql`
    mutation authSignIn($email: String!, $tokenAccess: Int!) {
  authSignIn(email: $email, tokenAccess: $tokenAccess) {
    __typename
    ... on SigInSuccess {
      access {
        token
        refreshToken
      }
      user {
        uid
        displayName
        photoURL
        profission
      }
      success {
        type
        message
      }
    }
    ... on ErrorResponse {
      error {
        type
        message
      }
    }
  }
}
    `;
export type AuthSignInMutationFn = Apollo.MutationFunction<AuthSignInMutation, AuthSignInMutationVariables>;

/**
 * __useAuthSignInMutation__
 *
 * To run a mutation, you first call `useAuthSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authSignInMutation, { data, loading, error }] = useAuthSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      tokenAccess: // value for 'tokenAccess'
 *   },
 * });
 */
export function useAuthSignInMutation(baseOptions?: Apollo.MutationHookOptions<AuthSignInMutation, AuthSignInMutationVariables>) {
        return Apollo.useMutation<AuthSignInMutation, AuthSignInMutationVariables>(AuthSignInDocument, baseOptions);
      }
export type AuthSignInMutationHookResult = ReturnType<typeof useAuthSignInMutation>;
export type AuthSignInMutationResult = Apollo.MutationResult<AuthSignInMutation>;
export type AuthSignInMutationOptions = Apollo.BaseMutationOptions<AuthSignInMutation, AuthSignInMutationVariables>;
export const AuthSignUpDocument = gql`
    mutation authSignUp($email: String!, $phone: String!, $username: String!, $role: EnumUserRole!) {
  authSignUp(user: {email: $email, phoneNumber: $phone, displayName: $username, role: $role}) {
    ... on SignUpSuccess {
      access {
        token
        refreshToken
      }
      user {
        uid
        displayName
        photoURL
        profission
        presentation
      }
      success {
        message
      }
    }
    ... on ErrorResponse {
      error {
        type
        message
      }
    }
  }
}
    `;
export type AuthSignUpMutationFn = Apollo.MutationFunction<AuthSignUpMutation, AuthSignUpMutationVariables>;

/**
 * __useAuthSignUpMutation__
 *
 * To run a mutation, you first call `useAuthSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authSignUpMutation, { data, loading, error }] = useAuthSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      username: // value for 'username'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useAuthSignUpMutation(baseOptions?: Apollo.MutationHookOptions<AuthSignUpMutation, AuthSignUpMutationVariables>) {
        return Apollo.useMutation<AuthSignUpMutation, AuthSignUpMutationVariables>(AuthSignUpDocument, baseOptions);
      }
export type AuthSignUpMutationHookResult = ReturnType<typeof useAuthSignUpMutation>;
export type AuthSignUpMutationResult = Apollo.MutationResult<AuthSignUpMutation>;
export type AuthSignUpMutationOptions = Apollo.BaseMutationOptions<AuthSignUpMutation, AuthSignUpMutationVariables>;
export const GetAllPostsDocument = gql`
    query getAllPosts($lastPost: String) {
  getAllPosts(lastPost: $lastPost) {
    ... on GetPosts {
      allPost {
        id
        owner
        ownerProfile {
          displayName
          thumbnailURL
          profission
        }
        title
        description
        commentsCount
        createdAt
      }
      success {
        message
        type
      }
    }
    ... on ErrorResponse {
      error {
        type
        message
      }
    }
  }
}
    `;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *      lastPost: // value for 'lastPost'
 *   },
 * });
 */
export function useGetAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
        return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, baseOptions);
      }
export function useGetAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, baseOptions);
        }
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const GetCommentByPostDocument = gql`
    query getCommentByPost($post: String!) {
  getCommentByPost(post: $post) {
    ... on GetComment {
      comments {
        id
        owner
        description
        ownerProfile {
          uid
          displayName
          thumbnailURL
          profission
        }
        createdAt
      }
    }
    ... on ErrorResponse {
      error {
        type
        message
      }
    }
  }
}
    `;

/**
 * __useGetCommentByPostQuery__
 *
 * To run a query within a React component, call `useGetCommentByPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentByPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentByPostQuery({
 *   variables: {
 *      post: // value for 'post'
 *   },
 * });
 */
export function useGetCommentByPostQuery(baseOptions?: Apollo.QueryHookOptions<GetCommentByPostQuery, GetCommentByPostQueryVariables>) {
        return Apollo.useQuery<GetCommentByPostQuery, GetCommentByPostQueryVariables>(GetCommentByPostDocument, baseOptions);
      }
export function useGetCommentByPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentByPostQuery, GetCommentByPostQueryVariables>) {
          return Apollo.useLazyQuery<GetCommentByPostQuery, GetCommentByPostQueryVariables>(GetCommentByPostDocument, baseOptions);
        }
export type GetCommentByPostQueryHookResult = ReturnType<typeof useGetCommentByPostQuery>;
export type GetCommentByPostLazyQueryHookResult = ReturnType<typeof useGetCommentByPostLazyQuery>;
export type GetCommentByPostQueryResult = Apollo.QueryResult<GetCommentByPostQuery, GetCommentByPostQueryVariables>;