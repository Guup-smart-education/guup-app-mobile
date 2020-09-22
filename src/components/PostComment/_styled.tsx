import styled from 'styled-components/native';

export const PostContainer = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.ligth};
  border-radius: ${({theme}) => theme.borderRadius[8]};
  padding-top: ${({theme}) => theme.spacing.padding[20]};
  padding-bottom: ${({theme}) => theme.spacing.padding[15]};
  padding-left: ${({theme}) => theme.spacing.padding[15]};
  padding-right: ${({theme}) => theme.spacing.padding[15]};
`;

export const PostHeader = styled.View`
  justify-content: space-between;
  flex: 1;
  flex-direction: row;
`;

export const PostBody = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const PostContent = styled.View`
  padding-left: 5px;
  padding-right: 5px;
`;

export const PostActions = styled.View`
  align-items: center;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 8px;
  padding-right: 5px;
`;

export const PostActionItem = styled.View`
  align-items: center;
`;

export const PostMedia = styled.View`
  width: 100%;
  overflow: hidden;
`;

export const PostMediaImage = styled.ImageBackground`
  background-color: ${({theme}) => theme.colors.ligthGrey};
  border-top-left-radius: ${({theme}) => theme.borderRadius[8]};
  border-top-right-radius: ${({theme}) => theme.borderRadius[8]};
  border-bottom-left-radius: ${({theme}) => theme.borderRadius[8]};
  border-bottom-right-radius: ${({theme}) => theme.borderRadius[8]};
  min-height: 150px;
  flex: 1;
`;

export const PostMediaVideo = styled.View`
  height: 150px;
`;
