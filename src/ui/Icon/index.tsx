import React from 'react';
import {ImageProps, StyleSheet} from 'react-native';
import {Icon} from './_styled';
import {EIcons} from './../../@enum/icons.enum';
import {EColors} from './../../@enum/color.enum';
import {BlurView} from '@react-native-community/blur';

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
  readonly blur?: boolean;
  readonly blurDark?: boolean;
}

export default ({size = 'normal', blur, blurDark, ...args}: IProps) => {
  if (blur) {
    return (
      <BlurView
        style={styles.square}
        blurRadius={2}
        blurType={blurDark ? 'material' : 'light'}>
        <Icon {...{...args, size}} />
      </BlurView>
    );
  }
  return <Icon {...{...args, size}} />;
};

const styles = StyleSheet.create({
  square: {
    borderRadius: 8,
  },
  round: {
    borderRadius: 14,
  },
});
