import styled from 'styled-components/native';

type Props = {
  readonly dark?: boolean;
  readonly light?: boolean;
  readonly center?: boolean;
};

export const SafeContainer = styled.SafeAreaView<Props>`
  background-color: ${({dark, light, theme}) =>
    dark
      ? theme.colors.ultraDark
      : light
      ? theme.colors.ligth
      : theme.colors.veryLigthGrey};
  flex: 1;
  width: 100%;
  ${({center}) => center && 'justify-content: center; align-items: center'};
`;

export const ContainerGradient = styled.ImageBackground.attrs(({theme}) => ({
  source: theme.gradients.dark,
}))`
  background-color: ${({theme}) => theme.colors.dark};
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Container = styled.View<Props>`
  background-color: ${({dark, theme}) =>
    dark ? theme.colors.dark : theme.colors.ligth};
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
