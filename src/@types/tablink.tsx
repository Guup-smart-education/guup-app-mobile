import {ReactNode} from 'react';

export type ETabLinks = {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly active?: boolean;
  readonly component?: ReactNode;
};
