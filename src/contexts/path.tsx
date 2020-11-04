import React, {createContext, useReducer} from 'react';
import {Course, Path} from './../graphql/types.d';
import {ActionMap} from './../@types/ActionMap';

export enum PathTypes {
  'SET_CURRENT_PATH' = 'SET_CURRENT_PATH',
  'SET_CURRENT_COURSE' = 'SET_CURRENT_COURSE',
  'CLEAR_STATE' = 'CLEAR_STATE',
}

type PathsPayload = {
  [PathTypes.SET_CURRENT_PATH]: Path;
  [PathTypes.SET_CURRENT_COURSE]: Course;
  [PathTypes.CLEAR_STATE]: null;
};

type ReducerActions = ActionMap<PathsPayload>[keyof ActionMap<PathsPayload>];

type PathsState = {
  currentPath?: Path;
  currentCourse?: Course;
};

type PathsDispatch = (action: ReducerActions) => {};

type PathCotext = {
  state: PathsState;
  dispatch: PathsDispatch;
};

const initialState: PathsState = {
  currentPath: {},
  currentCourse: {},
};

const init = () => {};

export const PathContext = createContext<PathCotext>({} as PathCotext);

const pathReducer = (state: PathsState, action: ReducerActions): PathsState => {
  switch (action.type) {
    case PathTypes.SET_CURRENT_PATH:
      return {
        ...state,
        currentPath: {...action.payload},
      };
    case PathTypes.SET_CURRENT_COURSE:
      return {
        ...state,
        currentCourse: {...action.payload},
      };
    case PathTypes.CLEAR_STATE:
      return {...initialState};
    default:
      return {
        ...state,
      };
  }
};

export const PathProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer<any, PathsState>(
    pathReducer,
    initialState,
    init,
  );
  return (
    <PathContext.Provider value={{state, dispatch}}>
      {children}
    </PathContext.Provider>
  );
};

// use hooks
export const usePathContext = () => {
  const context = React.useContext(PathContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
};
