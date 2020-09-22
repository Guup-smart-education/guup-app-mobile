import {TouchableWithoutFeedback} from 'react-native';
import React, {ReactNode} from 'react';

export interface IProps {
  readonly onPress: () => void;
  readonly children: ReactNode;
}

export default ({onPress, children}: IProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center'}}>
      {children}
    </TouchableWithoutFeedback>
  );
};
