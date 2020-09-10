import styled from 'styled-components/native';

export const NewsContainer = styled.ScrollView`
  background-color: ${({theme}) => theme.colors.ligth};
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
  width: 100%;
`;

export const NewsHeader = styled.View`
  width: 100%;
`;

export const NewsBody = styled.View`
  width: 100%;
`;

export const NewsContent = styled.View``;
