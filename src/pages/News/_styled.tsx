import styled from 'styled-components/native';

export const NewsContainer = styled.View`
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  /* padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]}; */
  width: 100%;
`;

export const NewsHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  width: 100%;
`;

export const NewsActions = styled.View`
  width: 100%;
`;

export const NewsTitle = styled.View`
  width: 70%;
`;

export const NewsBody = styled.View`
  width: 100%;
`;

export const NewsContent = styled.View``;

export const NewsEmpty = styled.View`
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
  /* padding-top: ${({theme}) => theme.spacing.padding[25]}; */
`;

export const NewsPost = styled.View`
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;
