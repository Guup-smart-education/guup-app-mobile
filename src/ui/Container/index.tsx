import React, {ReactNode} from 'react';
import {SafeContainer, Container, ContainerGradient} from './_styled';

type IProps = {
  readonly safe?: boolean;
  readonly dark?: boolean;
  readonly light?: boolean;
  readonly children: ReactNode;
  readonly center?: boolean;
};

export default ({safe, dark, light, children, center = true}: IProps) => {
  return safe ? (
    <SafeContainer {...{dark, light, center}}>{children}</SafeContainer>
  ) : dark ? (
    <ContainerGradient {...{dark, center}}>{children}</ContainerGradient>
  ) : (
    <Container {...{dark, light, center}}>{children}</Container>
  );
};
