import styled from 'styled-components/native';

export const CreatePostContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export const CreatePostAvatar = styled.View``;

export const CreatePostInput = styled.View`
  flex: 1;
`;

export const CreatePostInputComponent = styled.View`
  height: 55px;
  border-radius: ${({theme}) => theme.borderRadius[12]};
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  font-family: ${({theme}) => theme.fontFamily};
  font-size: ${({theme}) => theme.fontSize.medium};
  font-weight: ${({theme}) => theme.fontWeight.semiBold};
  padding-left: ${({theme}) => theme.spacing.padding[20]};
  width: 100%;
  justify-content: center;
`;
