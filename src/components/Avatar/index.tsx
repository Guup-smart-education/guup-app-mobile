import React from 'react';
import {Text} from './../../ui';
import {AvatarContainer, AvatarLeft, AvatarRight, Avatarimage} from './_style';

export enum ESizes {
  'small' = 'small',
  'normal' = 'normal',
}

export type IProps = {
  size?: keyof typeof ESizes;
  image?: Blob;
  firstText?: string | undefined;
  secondText?: string | undefined;
};

export default ({
  image,
  firstText,
  secondText,
  size = ESizes.normal,
}: IProps) => {
  return (
    <AvatarContainer>
      <AvatarLeft>
        <Avatarimage size={size} source={image} />
      </AvatarLeft>
      <AvatarRight>
        <Text preset="paragraph" bold>
          {firstText}
        </Text>
        <Text preset="label" color="darkGrey" light>
          {secondText}
        </Text>
      </AvatarRight>
    </AvatarContainer>
  );
};
