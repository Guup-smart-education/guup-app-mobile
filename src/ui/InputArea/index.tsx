import React, {forwardRef, ReactElement} from 'react';
import {TextInputProps} from 'react-native';
import {InputWrapper, InputComponent, FlagError} from './_styled';
import Text from './../Text';
import {FieldError} from 'react-hook-form';
import {RowFullWidth} from './../../ui';

interface IProps extends TextInputProps {
  readonly label?: string;
  readonly error?: FieldError | undefined;
}

const CustomInputArea = forwardRef<any, IProps>(
  (props, ref): ReactElement => {
    const {autoCorrect = false, error, label, ...args} = props;
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
            {...args}
            ref={ref}
            autoCorrect={autoCorrect}
            autoCapitalize="none"
            blurOnSubmit={false}
            multiline
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
