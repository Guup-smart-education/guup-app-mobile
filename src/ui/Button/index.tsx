import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {ButtonWrapper} from './_styled';
import Text from './../Text';

export enum EColors {
  'primary' = 'primary',
  'secondary' = 'secondary',
}

export enum EPreset {
  'solid' = 'solid',
  'outline' = 'outline',
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
}: IProps) => (
  <TouchableWithoutFeedback onPress={() => onPress()}>
    <ButtonWrapper {...{color, preset, loading}}>
      <Text preset="button" color="ligth">
        {text}
      </Text>
    </ButtonWrapper>
  </TouchableWithoutFeedback>
);
