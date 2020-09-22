import React, {useEffect, useRef, createElement} from 'react';
import {TextInput} from 'react-native';
import {SmartFormProps} from './../../@types/smart.form';

const SmartForm = ({
  children,
  errors,
  setValue,
  currentInput = 0,
  autoFocus = false,
}: SmartFormProps) => {
  const Inputs = useRef<Array<TextInput>>([]);
  useEffect(() => {
    (autoFocus || currentInput) && Inputs.current[currentInput].focus();
  });
  return (
    <>
      {(Array.isArray(children) ? [...children] : [children]).map(
        (child, i) => {
          return child.props.name
            ? createElement(child.type, {
                ...{
                  ...child.props,
                  ref: (e: TextInput) => (Inputs.current[i] = e),
                  onChangeText: (v: string) =>
                    setValue(child.props.name, v, true),
                  key: child.props.name,
                  error: errors[child.props.name],
                },
              })
            : child;
        },
      )}
    </>
  );
};

export default SmartForm;
