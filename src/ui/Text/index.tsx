import React, {ReactNode, useEffect, useState} from 'react';
import {Text} from './_styled';
import {EColors} from './../../@enum/color.enum';
import {Link} from './../../ui';

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

export default ({children, maxLength, ...args}: IProps) => {
  // const textLength = children?.toString.length || 0;
  // const [shortText, setShortText] = useState<string | null>(null);
  // const [moreText, setMoreText] = useState<boolean>(false);
  // // Effects
  // useEffect(() => {
  //   if (children && maxLength && textLength > maxLength) {
  //     setShortText(children.toString().substring(0, maxLength));
  //   }
  // }, [children]);
  // End effects
  return (
    <Text {...args} allowFontScaling={false}>
      {children}
      {/* {shortText}{' '}
      {maxLength && textLength > maxLength && (
        <Link onPress={() => setMoreText(!moreText)} color="primary">
          {moreText ? 'Ver menos' : 'Ver mais'}
        </Link>
      )} */}
    </Text>
  );
};
