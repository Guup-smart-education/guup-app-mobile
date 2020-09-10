import React, {ReactNode} from 'react';
import {RowFullWidth} from './_styled';

type Props = {
  readonly padding?: number;
  readonly children: ReactNode;
};

export default ({padding, children}: Props) => {
  return <RowFullWidth {...{padding}}>{children}</RowFullWidth>;
};
