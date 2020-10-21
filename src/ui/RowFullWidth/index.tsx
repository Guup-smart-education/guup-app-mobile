import React, {ReactNode} from 'react';
import {ViewStyle} from 'react-native';
import {RowFullWidth} from './_styled';

enum EAlign {
  'center' = 'center',
  'flex-start' = 'flex-start',
  'flex-end' = 'flex-end',
  'space-between' = 'space-between',
  'space-around' = 'space-around',
}

export type IProps = {
  readonly align?: keyof typeof EAlign;
  readonly padding?: number;
  readonly children: ReactNode;
  readonly style?: ViewStyle;
};

export default ({padding, children, align = 'flex-start', style}: IProps) => {
  return <RowFullWidth {...{padding, align, style}}>{children}</RowFullWidth>;
};
