import React from 'react';
import {Separator} from './_styled';
import {EColors} from './../../@enum/color.enum';

export enum ESize {
  'stroke' = 'stroke',
  'lili' = 'lili',
  'tiny' = 'tiny',
  'small' = 'small',
  'medium' = 'medium',
  'large' = 'large',
  'xLarge' = 'xLarge',
  'extraLarge' = 'extraLarge',
  'bigger' = 'bigger',
}

export type IProps = {
  readonly size?: keyof typeof ESize;
  readonly color?: keyof typeof EColors;
};

export default ({size, color}: IProps) => <Separator {...{size, color}} />;
