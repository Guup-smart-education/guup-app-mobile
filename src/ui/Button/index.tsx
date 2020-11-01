import React from 'react';
import {TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import {ButtonWrapper} from './_styled';
import Text from './../Text';

export enum EColors {
  'primary' = 'primary',
  'secondary' = 'secondary',
}

export enum EPreset {
  'solid' = 'solid',
  'outline' = 'outline',
  'light' = 'light',
}

export type IProps = {
  color?: keyof typeof EColors;
  preset?: keyof typeof EPreset;
  disable?: boolean;
  text?: string;
  onPress: Function;
  loading?: boolean;
};

export default ({
  onPress,
  preset = EPreset.solid,
  text,
  color = EColors.primary,
  loading,
  disable,
}: IProps) => (
  <TouchableWithoutFeedback onPress={() => !disable && onPress()}>
    <ButtonWrapper {...{color, preset, loading, disable}}>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text
          preset="button"
          color={
            disable ? 'darkGrey' : preset === 'solid' ? 'ligth' : 'primary'
          }
          underline>
          {text}
        </Text>
      )}
    </ButtonWrapper>
  </TouchableWithoutFeedback>
);
