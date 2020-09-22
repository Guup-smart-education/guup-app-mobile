import React, {ReactNode} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {LinkWrapper, Link, LinkOverlay, LinkLoadingIndicator} from './_styled';

export enum EColors {
  'ligth' = 'ligth',
  'dark' = 'dark',
  'primary' = 'primary',
  'contrast' = 'contrast',
}

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
};

export default ({
  children,
  onPress,
  preset = EPreset.simple,
  loading,
  disable,
  ...args
}: IProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={loading ? () => console.debug('Is loading') : () => onPress()}>
      {preset === EPreset.simple ? (
        <Link {...{...args, loading, disable}}>{children}</Link>
      ) : (
        <LinkWrapper {...{...args, preset, loading, disable}}>
          {loading && (
            <LinkOverlay>
              <LinkLoadingIndicator size="small" />
            </LinkOverlay>
          )}
          <Link {...{...args, preset, loading}}>{children}</Link>
        </LinkWrapper>
      )}
    </TouchableWithoutFeedback>
  );
};
