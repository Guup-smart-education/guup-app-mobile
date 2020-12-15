import styled from 'styled-components/native';

interface ITabItem {
  readonly active?: boolean;
  readonly dark?: boolean;
}

export const TabsContainer = styled.View<ITabItem>`
  flex-direction: row;
  align-items: center;
  height: 54px;
  border-width: 2px;
  border-color: ${({theme, dark}) =>
    dark ? theme.colors.ultraDark : theme.colors.veryLigthGrey};
  border-radius: ${({theme}) => theme.borderRadius[12]};
  overflow: hidden;
`;

export const TabItem = styled.View<ITabItem>`
  align-items: center;
  flex: 1;
  background-color: ${({theme, active}) =>
    !active ? 'transparent' : theme.colors.veryLigthGrey};
  height: 100%;
  justify-content: center;
  overflow: hidden;
`;
