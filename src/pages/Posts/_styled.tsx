import styled from 'styled-components/native';

export const PostsContainer = styled.View`
  width: 100%;
  flex: 1;
  height: 100%;
`;

export const PostsHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing[20]};
  padding-right: ${({theme}) => theme.spacing[20]};
  /* border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.ligthGrey}; */
`;

export const PostsBody = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
`;

export const PostItemContainer = styled.View`
  padding-left: ${({theme}) => theme.spacing[20]};
  padding-right: ${({theme}) => theme.spacing[20]};
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
