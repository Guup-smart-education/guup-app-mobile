import React from 'react';
import {Separator} from './_styled';

export enum ESize {
  'lili' = 'lili',
  'tiny' = 'tiny',
  'small' = 'small',
  'medium' = 'medium',
  'large' = 'large',
  'extraLarge' = 'extraLarge',
  'bigger' = 'bigger',
}

export type IProps = {
  readonly size?: keyof typeof ESize;
};

export default ({size}: IProps) => <Separator {...{size}} />;
