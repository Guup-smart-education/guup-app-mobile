import styled from 'styled-components/native';

export const MenuContainer = styled.View`
  width: 100%;
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.veryLigthGrey};
`;

export const MenuListItemcontainer = styled.View`
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.veryLigthGrey};
`;
