import React, {ReactNode} from 'react';
import {Text} from './_styled';
import {EColors} from './../../@enum/color.enum';

export enum EPreset {
  'title' = 'title',
  'subtitle' = 'subtitle',
  'paragraph' = 'paragraph',
  'label' = 'label',
  'chat' = 'chat',
  'button' = 'button',
  'tiny' = 'tiny',
  'largePrice' = 'largePrice',
  'comment' = 'comment',
  'tall' = 'tall',
}

export enum EWeight {
  'light' = 'light',
  'regular' = 'regular',
  'medium' = 'medium',
  'seminBold' = 'seminBold',
}

export type IProps = {
  children?: ReactNode;
  preset?: keyof typeof EPreset;
  weight?: keyof typeof EWeight;
  center?: boolean;
  bold?: boolean;
  light?: boolean;
  color?: keyof typeof EColors;
  lineHeight?: number;
  underline?: boolean;
};

export default ({children, ...args}: IProps) => (
  <Text {...args}>{children}</Text>
);
