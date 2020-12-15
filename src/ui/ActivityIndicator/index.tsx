import React from 'react';
import {ActivityIndicatorProps} from 'react-native';
import {ActivityIndicator} from './_styled';
import {EColors} from './../../@enum/color.enum';
interface IActivityIndicator extends ActivityIndicatorProps {
  readonly color?: keyof typeof EColors;
}

export default ({color = 'primary', size = 'large'}: IActivityIndicator) => {
  return <ActivityIndicator {...{color, size}} />;
};
