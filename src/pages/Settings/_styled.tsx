import styled from 'styled-components/native';

export const PostsContainer = styled.View`
  width: 100%;
  flex: 1;
`;

export const PostsHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing[20]};
  padding-right: ${({theme}) => theme.spacing[20]};
`;

export const PostsBody = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
