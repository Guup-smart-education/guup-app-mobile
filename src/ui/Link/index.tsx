import React, {ReactNode} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {LinkWrapper, Link, LinkOverlay, LinkLoadingIndicator} from './_styled';
import {EColors} from './../../@enum/color.enum';

// export enum EColors {
//   'ligth' = 'ligth',
//   'dark' = 'dark',
//   'primary' = 'primary',
//   'contrast' = 'contrast',
// }

export enum EPreset {
  'solid' = 'solid',
  'outline' = 'outline',
  'simple' = 'simple',
}

export type IProps = {
  children?: ReactNode;
  color?: keyof typeof EColors;
  preset?: keyof typeof EPreset;
  disable?: boolean;
  onPress: Function;
  loading?: boolean;
  center?: boolean;
};

export default ({
  children,
  onPress,
  preset = EPreset.simple,
  loading,
  disable,
  color,
  ...args
}: IProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => !loading && !disable && onPress()}>
      {preset === EPreset.simple ? (
        <Link {...{...args, color, loading, disable}}>{children}</Link>
      ) : (
        <LinkWrapper {...{...args, color, preset, loading, disable}}>
          {loading && (
            <LinkOverlay>
              <LinkLoadingIndicator
                size="small"
                color={
                  preset === EPreset.solid
                    ? EColors.ligth
                    : color || EColors.contrast
                }
              />
            </LinkOverlay>
          )}
          <Link {...{...args, color, preset, loading}}>{children}</Link>
        </LinkWrapper>
      )}
    </TouchableWithoutFeedback>
  );
};
