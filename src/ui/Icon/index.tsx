import React from 'react';
// import {ThemeContext} from 'styled-components';
import {ImageProps, StyleSheet} from 'react-native';
import {Icon, BurbleIcon} from './_styled';
import {EIcons} from './../../@enum/icons.enum';
import {EColors} from './../../@enum/color.enum';
import {BlurView} from '@react-native-community/blur';
import FastImage from 'react-native-fast-image';

enum ESizes {
  'small' = 'small',
  'normal' = 'normal',
  'large' = 'large',
  'xlarge' = 'xlarge',
  'xxlarge' = 'xxlarge',
}

export interface IProps {
  readonly source: keyof typeof EIcons;
  readonly tintColor?: keyof typeof EColors;
  readonly backColor?: keyof typeof EColors;
  readonly size?: keyof typeof ESizes;
  readonly style?: ImageProps;
  readonly blur?: boolean;
  readonly back?: boolean;
  readonly burble?: boolean;
  readonly blurDark?: boolean;
}

export default ({
  size = 'normal',
  blur,
  blurDark,
  burble = false,
  back = false,
  ...args
}: IProps) => {
  // const theme = useContext(ThemeContext);
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
  if (back && burble) {
    return (
      <BurbleIcon as={BlurView} blurType="light" blurRadius={0.5}>
        <Icon {...{...args, size}} />
      </BurbleIcon>
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
