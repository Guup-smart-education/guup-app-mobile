import React from 'react';
import {ActivityIndicator} from './_styled';
import {EColors} from './../../@enum/color.enum';
interface IActivityIndicator {
  readonly color?: keyof typeof EColors;
}

export default ({color = 'primary'}: IActivityIndicator) => {
  return <ActivityIndicator {...{color}} />;
};
