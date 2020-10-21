import React from 'react';
import {ImageProps} from 'react-native';
import {Icon} from './_styled';
import {EIcons} from './../../@enum/icons.enum';
import {EColors} from './../../@enum/color.enum';

enum ESizes {
  'small' = 'small',
  'normal' = 'normal',
  'large' = 'large',
}

export interface IProps {
  readonly source: keyof typeof EIcons;
  readonly tintColor?: keyof typeof EColors;
  readonly backColor?: keyof typeof EColors;
  readonly size?: keyof typeof ESizes;
  readonly style?: ImageProps;
}

export default ({size = 'normal', ...args}: IProps) => (
  <Icon {...{...args, size}} />
);
