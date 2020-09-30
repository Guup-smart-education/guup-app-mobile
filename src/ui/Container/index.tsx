import React, {ReactNode} from 'react';
import {SafeContainer, Container, ContainerGradient} from './_styled';

type IProps = {
  readonly safe?: boolean;
  readonly dark?: boolean;
  readonly children: ReactNode;
  readonly center?: boolean;
};

export default ({safe, dark, children, center = true}: IProps) => {
  return safe ? (
    <SafeContainer {...{dark, center}}>{children}</SafeContainer>
  ) : dark ? (
    <ContainerGradient {...{dark, center}}>{children}</ContainerGradient>
  ) : (
    <Container {...{dark, center}}>{children}</Container>
  );
};
