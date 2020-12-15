import styled from 'styled-components/native';

export const MenuContainer = styled.View<{noBorder: boolean}>`
  width: 100%;
  border-top-width: ${({noBorder}) => (!noBorder ? 1 : 0)}px;
  border-top-color: ${({theme}) => theme.colors.veryLigthGrey};
`;

export const MenuListItemcontainer = styled.View<{
  compress: boolean;
  noBorder: boolean;
  padding: boolean;
}>`
  padding-left: ${({theme, padding}) => (padding ? theme.spacing[25] : 0)};
  padding-right: ${({theme, padding}) => (padding ? theme.spacing[25] : 0)};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${({compress}) => (compress ? 44 : 54)}px;
  width: 100%;
  border-bottom-width: ${({noBorder}) => (!noBorder ? 1 : 0)}px;
  border-bottom-color: ${({theme}) => theme.colors.veryLigthGrey};
`;

export const MenuListText = styled.View`
  flex: 1;
  /* padding-left: 10px; */
`;
