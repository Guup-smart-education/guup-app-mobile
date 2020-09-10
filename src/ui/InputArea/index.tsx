import React, {forwardRef, ReactElement} from 'react';
import {InputWrapper, InputComponent, FlagError} from './_styled';
import {TextInputProps} from 'react-native';
import Text from './../Text';
import {FieldError} from 'react-hook-form';

interface IProps extends TextInputProps {
  autoCorrect?: boolean;
  placeholder?: string | '';
  focus?: boolean;
  name: string;
  error?: FieldError | undefined;
}

const CustomInputArea = forwardRef<any, IProps>(
  (props, ref): ReactElement => {
    const {autoCorrect = false, error, ...args} = props;
    // const [value, setValue] = useState('');
    return (
      <InputWrapper>
        <InputComponent
          {...args}
          ref={ref}
          // value={value}
          autoCorrect={autoCorrect}
          autoCapitalize="none"
          // onChangeText={(val) => setValue(val)}
        />
        {error && (
          <FlagError>
            <Text color="primary" preset="label" center bold>
              Error - {error?.message}
            </Text>
          </FlagError>
        )}
      </InputWrapper>
    );
  },
);

export default CustomInputArea;
