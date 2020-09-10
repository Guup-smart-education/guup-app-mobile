import styled from 'styled-components/native';

type Props = {
  readonly dark?: boolean;
};

export const SafeContainer = styled.SafeAreaView`
  background-color: ${({theme}) => theme.colors.ligth};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ContainerGradient = styled.ImageBackground.attrs(({theme}) => ({
  source: theme.gradients.dark,
}))`
  background-color: ${({theme}) => theme.colors.dark};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View<Props>`
  background-color: ${({dark, theme}) =>
    dark ? theme.colors.dark : theme.colors.ligth};
  flex: 1;
  justify-content: center;
  align-items: center;
`;