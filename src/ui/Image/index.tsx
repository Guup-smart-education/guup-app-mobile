import React from 'react';
import {CustomImage} from './_styled';
import {ImageSourceEnums, ImageModuleEnums} from './../../@enum/image.enum';

export interface IProps {
  module: keyof typeof ImageModuleEnums;
  name: keyof typeof ImageSourceEnums;
}

export default ({...args}: IProps) => {
  return <CustomImage {...args} />;
};
