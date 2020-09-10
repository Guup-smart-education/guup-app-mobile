import React, {ReactNode} from 'react';
import {TouchArea} from './_styled';

type Props = {
  readonly children: ReactNode;
};

export default ({children}: Props) => {
  return <TouchArea>{children}</TouchArea>;
};
