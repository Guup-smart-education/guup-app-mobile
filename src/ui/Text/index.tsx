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
  'postComment' = 'postComment',
  'comment' = 'comment',
  'tall' = 'tall',
  'date' = 'date',
  'header' = 'header',
}

export enum EWeight {
  'light' = 'light',
  'regular' = 'regular',
  'medium' = 'medium',
  'seminBold' = 'seminBold',
}

export interface IProps {
  readonly children?: ReactNode;
  readonly preset?: keyof typeof EPreset;
  readonly weight?: keyof typeof EWeight;
  readonly center?: boolean;
  readonly bold?: boolean;
  readonly light?: boolean;
  readonly color?: keyof typeof EColors;
  readonly lineHeight?: number;
  readonly underline?: boolean;
  readonly hightline?: keyof typeof EColors;
  readonly maxLength?: number;
}

export default ({children, ...args}: IProps) => {
  // End effects
  return (
    <Text {...args} allowFontScaling={false}>
      {children}
    </Text>
  );
};
