import React, {ReactNode} from 'react';
import {LinearGradient} from 'react-native-linear-gradient';
import {SafeContainer, Container, ContainerGradient} from './_styled';

type IProps = {
  safe?: boolean;
  dark?: boolean;
  children: ReactNode;
};

export default ({safe, dark, children}: IProps) => {
  return safe ? (
    <SafeContainer>{children}</SafeContainer>
  ) : dark ? (
    <ContainerGradient>{children}</ContainerGradient>
  ) : (
    <Container {...{dark}}>{children}</Container>
  );
};
