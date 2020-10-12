import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components';
import {AvatarGroupContainer, AvatarItem} from './_styled';

interface IGuupAvatar {
  readonly avatars: [string];
}

const GuupAvatarGroup = ({avatars}: IGuupAvatar) => {
  const theme = useContext(ThemeContext);
  return (
    <AvatarGroupContainer>
      {avatars.map((v: string, i: number) => (
        <AvatarItem
          key={`group-avatar-item-${i}-${v}`}
          source={v ? {uri: v} : theme.images.avatar.blank}
          style={{
            transform: [{translateX: -(10 * i)}],
          }}
        />
      ))}
    </AvatarGroupContainer>
  );
};

export default GuupAvatarGroup;
