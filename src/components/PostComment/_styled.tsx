import styled from 'styled-components/native';

export const PostContainer = styled.View`
  width: 100%;
`;

export const PostHeader = styled.View`
  justify-content: space-between;
  flex: 1;
  flex-direction: row;
`;

export const PostBody = styled.View`
  flex: 1;
  padding-left: ${({theme}) => theme.sizes.avatar[36]};
  margin-left: ${({theme}) => theme.spacing[15]};
`;

export const PostContent = styled.View`
  flex: 1;
`;

export const PostActions = styled.View`
  flex: 1;
`;

export const PostActionItem = styled.View`
  flex-direction: row;
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
  height: 150px;
  flex: 1;
`;

export const PostMediaVideo = styled.View`
  height: 150px;
`;
