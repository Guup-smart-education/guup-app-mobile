import styled from 'styled-components/native';

export const NewsContainer = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.ligth};
  /* padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]}; */
  width: 100%;
`;

export const NewsHeader = styled.View`
  width: 100%;
`;

export const NewsActions = styled.View`
  width: 100%;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[20]};
`;

export const NewsTitle = styled.View`
  width: 70%;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;

export const NewsBody = styled.View`
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  width: 100%;
  flex: 1;
  justify-content: center;
`;

export const NewsContent = styled.View`
  flex: 1;
`;

export const NewsEmpty = styled.View`
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
  /* padding-top: ${({theme}) => theme.spacing.padding[25]}; */
`;

export const NewsPost = styled.View`
  /* padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]}; */
`;
