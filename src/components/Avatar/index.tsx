import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components';
import {Text} from './../../ui';
import {AvatarContainer, AvatarLeft, AvatarRight, Avatarimage} from './_style';

export enum ESizes {
  'comment' = 'comment',
  'small' = 'small',
  'normal' = 'normal',
}

export type IProps = {
  size?: keyof typeof ESizes;
  image?: string | undefined | null;
  firstText?: string | undefined | null;
  secondText?: string | undefined | null;
};

export default ({
  image,
  firstText,
  secondText,
  size = ESizes.normal,
}: IProps) => {
  const theme = useContext(ThemeContext);
  return (
    <AvatarContainer>
      <AvatarLeft>
        <Avatarimage
          size={size}
          {...(image
            ? {source: {uri: image}}
            : {source: theme.images.avatar.blank})}
        />
      </AvatarLeft>
      <AvatarRight>
        <Text preset={size === 'comment' ? 'label' : 'comment'} bold>
          {firstText}
        </Text>
        <Text preset="label" color="darkGrey" light>
          {secondText}
        </Text>
      </AvatarRight>
    </AvatarContainer>
  );
};
