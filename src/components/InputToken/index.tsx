import React, {useState, useEffect, useRef} from 'react';
import {TextInput} from 'react-native';
import {TokenContainer, TokenInput} from './_styled';
import R from 'ramda';

interface IInputToken {
  onSetValue: (token: string) => void;
}

export default ({onSetValue}: IInputToken) => {
  const TOKEN_LENGTH = 3;
  const [values, setValues] = useState<Array<string>>([]);
  const Inputs = useRef<Array<TextInput>>([]);
  const onChangeText = (e: string, i: number) => {
    if (values[i] !== undefined) {
      const val = [...values];
      val[i] = e;
      setValues([...val]);
    } else {
      setValues([...values, e]);
    }
    if (e === undefined || e === null || e === '') {
      return;
    }
    i < TOKEN_LENGTH && Inputs.current[i + 1].focus();
  };
  useEffect(() => {
    const token = R.replace(/,/g, '', values.toString());
    onSetValue(token);
  }, [onSetValue, values]);
  return (
    <TokenContainer>
      <TokenInput
        maxLength={1}
        keyboardType="number-pad"
        onChangeText={(val: string) => onChangeText(val, 0)}
        blurOnSubmit={false}
        ref={(e: TextInput) => (Inputs.current[0] = e)}
        returnKeyType="next"
      />
      <TokenInput
        maxLength={1}
        keyboardType="number-pad"
        onChangeText={(val: string) => onChangeText(val, 1)}
        blurOnSubmit={false}
        ref={(e: TextInput) => (Inputs.current[1] = e)}
        returnKeyType="next"
      />
      <TokenInput
        maxLength={1}
        keyboardType="number-pad"
        onChangeText={(val: string) => onChangeText(val, 2)}
        blurOnSubmit={false}
        ref={(e: TextInput) => (Inputs.current[2] = e)}
        returnKeyType="next"
      />
      <TokenInput
        maxLength={1}
        keyboardType="number-pad"
        onChangeText={(val: string) => onChangeText(val, 3)}
        blurOnSubmit={false}
        ref={(e: TextInput) => (Inputs.current[3] = e)}
        returnKeyType="next"
      />
    </TokenContainer>
  );
};
