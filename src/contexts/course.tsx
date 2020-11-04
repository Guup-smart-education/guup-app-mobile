import React, {createContext, useReducer} from 'react';
import {Course} from './../graphql/types.d';
import {ActionMap} from './../@types/ActionMap';

export enum CourseTypes {
  'SET_CURRENT_COURSE' = 'SET_CURRENT_COURSE',
  'CLEAR_STATE' = 'CLEAR_STATE',
}

type CoursePayload = {
  [CourseTypes.SET_CURRENT_COURSE]: Course;
  [CourseTypes.CLEAR_STATE]: null;
};

type ReducerActions = ActionMap<CoursePayload>[keyof ActionMap<CoursePayload>];

type CourseState = {
  currentCourse: Course;
};

type CourseDispatch = (action: ReducerActions) => {};

type CourseCotext = {
  state: CourseState;
  dispatch: CourseDispatch;
};

const initialState: CourseState = {
  currentCourse: {},
};

const init = () => {};

export const CourseContext = createContext<CourseCotext>({} as CourseCotext);

const courseReducer = (
  state: CourseState,
  action: ReducerActions,
): CourseState => {
  switch (action.type) {
    case CourseTypes.SET_CURRENT_COURSE:
      return {
        currentCourse: {...action.payload},
      };
    case CourseTypes.CLEAR_STATE:
      return {...initialState};
    default:
      return {
        ...state,
      };
  }
};

export const CourseProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer<any, CourseState>(
    courseReducer,
    initialState,
    init,
  );
  return (
    <CourseContext.Provider value={{state, dispatch}}>
      {children}
    </CourseContext.Provider>
  );
};

// use hooks
export const useCourseContext = () => {
  const context = React.useContext(CourseContext);
  if (context === undefined) {
    throw new Error('CourseState must be used within a CourseProvider');
  }
  return context;
};
