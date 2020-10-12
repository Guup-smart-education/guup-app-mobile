import React from 'react';
import {ImageProps} from 'react-native';
import {Icon} from './_styled';
import {EIcons} from './../../@enum/icons.enum';
import {EColors} from './../../@enum/color.enum';

export interface IProps extends ImageProps {
  readonly source: keyof typeof EIcons;
  readonly tintColor?: keyof typeof EColors;
}

export default ({...args}: IProps) => <Icon {...args} />;
