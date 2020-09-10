import React, {forwardRef, ReactElement} from 'react';
import {InputWrapper, InputComponent, FlagError} from './_styled';
import {Text, RowFullWidth} from './../../ui';
import {SmartInputProps} from './../../@types/smart.input';

const SmartInput = forwardRef<any, SmartInputProps>(
  (props, ref): ReactElement => {
    const {autoCorrect = false, error, ...args} = props;
    return (
      <RowFullWidth padding={40}>
        <InputWrapper>
          <InputComponent
            {...{...args, ref, autoCorrect}}
            autoCapitalize="none"
            blurOnSubmit={false}
          />
          <FlagError>
            <Text color="primary" preset="label" center bold>
              {error?.message}
            </Text>
          </FlagError>
        </InputWrapper>
      </RowFullWidth>
    );
  },
);

export default SmartInput;
