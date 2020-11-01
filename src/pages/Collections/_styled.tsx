import styled from 'styled-components/native';

export const CollectionsContainer = styled.View`
  width: 100%;
  flex: 1;
`;

export const CollectionsHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing[20]};
  padding-right: ${({theme}) => theme.spacing[20]};
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.ligthGrey};
`;

export const CollectionsBody = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  padding-bottom: ${({theme}) => theme.spacing[25]};
`;

export const CollectionItem = styled.View`
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
`;
