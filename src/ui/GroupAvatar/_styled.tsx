import styled from 'styled-components/native';

export const AvatarGroupContainer = styled.View`
  flex-direction: row;
`;

export const AvatarItem = styled.ImageBackground`
  border-radius: 16px;
  height: 32px;
  width: 32px;
  border-width: 2px;
  border-color: ${({theme}) => theme.colors.ligth};
  background-color: ${({theme}) => theme.colors.ligthGrey};
  overflow: hidden;
`;
