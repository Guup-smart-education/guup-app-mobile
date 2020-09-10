import styled from 'styled-components/native';

export const IconListContainer = styled.View`
  width: 100%;
`;

export const IconListItem = styled.View`
  flex-direction: row;
  /* width: 100%;
  margin-bottom: ${({theme}) => theme.spacing[10]}; */
  align-items: center;
`;

export const IconListIcon = styled.View``;

export const IconListContent = styled.View`
  margin-left: ${({theme}) => theme.spacing[10]};
`;
