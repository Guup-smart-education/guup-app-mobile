import {TouchableWithoutFeedback} from 'react-native';
import React, {ReactNode} from 'react';

export interface IProps {
  readonly onPress?: () => void | undefined;
  readonly children: ReactNode;
}

export default ({onPress, children}: IProps) => (
  <TouchableWithoutFeedback onPress={onPress}>
    {children}
  </TouchableWithoutFeedback>
);
