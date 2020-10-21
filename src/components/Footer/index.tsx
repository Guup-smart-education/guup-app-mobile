import React from 'react';
import {FooterContainer} from './_styled';
import {EColors} from './../../@enum/color.enum';

export interface IFooter {
  readonly color?: keyof typeof EColors;
}

const GuupFooter: React.FC<IFooter> = ({color, children}) => {
  return <FooterContainer {...{color}}>{children}</FooterContainer>;
};

export default GuupFooter;
