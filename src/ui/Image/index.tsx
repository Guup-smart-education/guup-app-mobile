import React from 'react';
import {CustomImage} from './_styled';
import {ImageProps} from 'react-native';
import {ImageSourceEnums, ImageModuleEnums} from './../../@enum/image.enum';

export interface IProps extends ImageProps {
  module: keyof typeof ImageModuleEnums;
  name: keyof typeof ImageSourceEnums;
}

export default ({...args}: IProps) => <CustomImage {...args} />;
