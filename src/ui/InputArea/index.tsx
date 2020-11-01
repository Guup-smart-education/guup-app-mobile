import React, {forwardRef, ReactElement} from 'react';
import {TextInputProps} from 'react-native';
import {InputWrapper, InputComponent, FlagError} from './_styled';
import Text from './../Text';
import {FieldError} from 'react-hook-form';
import {RowFullWidth} from './../../ui';
import {EColors} from './../../@enum/color.enum';

enum EPreset {
  'title' = 'title',
  'subtitle' = 'subtitle',
  'paragraph' = 'paragraph',
}

export interface IProps extends TextInputProps {
  readonly name?: string;
  readonly label?: string;
  readonly error?: FieldError | undefined;
  readonly color?: keyof typeof EColors;
  readonly preset?: keyof typeof EPreset;
}

const CustomInputArea = forwardRef<any, IProps>(
  (props, ref): ReactElement => {
    const {
      autoCorrect = false,
      error,
      label,
      color,
      preset = EPreset.paragraph,
      ...args
    } = props;
    return (
      <RowFullWidth>
        <InputWrapper>
          {label && (
            <RowFullWidth padding={25}>
              <Text preset="label" bold>
                {label}
              </Text>
            </RowFullWidth>
          )}
          <InputComponent
            {...{...args, ref, autoCorrect, preset, color}}
            autoCapitalize="none"
            blurOnSubmit={false}
            multiline
            placeholderTextColor={color || 'ligthGrey'}
          />
          {error && (
            <FlagError>
              <Text color="primary" preset="label" center bold>
                Error - {error?.message}
              </Text>
            </FlagError>
          )}
        </InputWrapper>
      </RowFullWidth>
    );
  },
);

export default CustomInputArea;
