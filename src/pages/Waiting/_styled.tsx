import styled from 'styled-components/native';

export const WaitinWrapper = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  padding-top: 5%;
`;

export const WaitingImage = styled.Image.attrs(({source, theme}) => ({
  source: source || theme.images.logo.medium,
}))``;

export const WaitingContent = styled.View`
  width: 60%;
  padding-bottom: 25%;
`;
