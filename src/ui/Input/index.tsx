import React, {forwardRef, ReactElement, useState} from 'react';
import {
  InputWrapper,
  InputComponent,
  FlagError,
  InputLeftIcon,
} from './_styled';
import {TextInputProps} from 'react-native';
import Text from './../Text';
import {FieldError} from 'react-hook-form';
import {EIcons} from './../../@enum/icons.enum';
import Icon from './../Icon';

enum ETextAlign {
  'center' = 'center',
  'left' = 'left',
  'right' = 'right',
}

export interface IProps extends TextInputProps {
  autoCorrect?: boolean;
  placeholder?: string | '';
  focus?: boolean;
  name: string;
  error?: FieldError | undefined;
  hasCustomError?: boolean;
  leftIcon?: keyof typeof EIcons;
  textAlign?: keyof typeof ETextAlign;
}

const CustomInput = forwardRef<any, IProps>(
  (props, ref): ReactElement => {
    const {
      autoCorrect = false,
      hasCustomError = true,
      error,
      textAlign = 'center',
      leftIcon,
      ...args
    } = props;
    const [isFocus, setFocus] = useState<boolean>();
    return (
      <InputWrapper>
        {leftIcon && (
          <InputLeftIcon>
            <Icon
              source={leftIcon}
              tintColor={isFocus ? 'dark' : 'ligthGrey'}
            />
          </InputLeftIcon>
        )}
        <InputComponent
          {...{...args, ref, autoCorrect, textAlign, leftIcon}}
          autoCapitalize="none"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {hasCustomError && (
          <FlagError>
            <Text color="primary" preset="label" center bold>
              {error?.message}
            </Text>
          </FlagError>
        )}
      </InputWrapper>
    );
  },
);

// const CustomInput: React.FC<TextInputProperties> = ({
//   autoCorrect = false,
//   error,
//   ...args
// }: IProps) => {
//   const [value, setValue] = useState('');
//   return (
//     <InputWrapper>
//       <InputComponent
//         {...args}
//         value={value}
//         autoCorrect={autoCorrect}
//         autoCapitalize="none"
//         onChangeText={(val) => setValue(val)}
//       />
//       <FlagError>
//         <Text color="primary" preset="label" center bold>
//           {error?.message}
//         </Text>
//       </FlagError>
//     </InputWrapper>
//   );
// };

export default CustomInput;
