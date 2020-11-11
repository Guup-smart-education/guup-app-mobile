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
  readonly size?: keyof typeof ESizes;
  readonly image?: string | undefined | null;
  readonly firstText?: string | undefined | null;
  readonly secondText?: string | undefined | null;
  readonly ligth?: boolean;
};

export default ({
  image,
  firstText,
  secondText,
  size = ESizes.normal,
  ligth = false,
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
        <Text
          preset={size === 'comment' ? 'label' : 'comment'}
          bold
          color={ligth ? 'ligth' : 'dark'}>
          {firstText}
        </Text>
        <Text preset="label" color={ligth ? 'ligth' : 'darkGrey'}>
          {secondText}
        </Text>
      </AvatarRight>
    </AvatarContainer>
  );
};
