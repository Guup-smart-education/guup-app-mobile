import React, {ReactNode} from 'react';
import {Form} from './_styled';

type Props = {
  children: ReactNode;
};

export default ({children}: Props) => {
  return <Form>{children}</Form>;
};
