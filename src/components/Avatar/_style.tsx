import styled from 'styled-components/native';
import {IProps, ESizes} from './';

export const AvatarContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const AvatarLeft = styled.View`
  margin-right: ${({theme}) => theme.spacing[15]};
`;

export const AvatarRight = styled.View``;

export const Avatarimage = styled.ImageBackground.attrs(({source}) => ({
  source,
}))<IProps>`
  height: ${({theme, size}) =>
    size === ESizes.normal ? theme.sizes.avatar[48] : theme.sizes.avatar[36]};
  width: ${({theme, size}) =>
    size === ESizes.normal ? theme.sizes.avatar[48] : theme.sizes.avatar[36]};
  background-color: ${({theme}) => theme.colors.ligthGrey};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;
