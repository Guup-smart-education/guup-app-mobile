import styled from 'styled-components/native';

export const BotContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const BotMessage = styled.View`
  width: 92%;
  text-align: center;
  height: ${({theme}) => parseInt(theme.spacing.lineHeigth.l24) * 3 + 'px'};
`;

export const BotImage = styled.Image.attrs(({source, theme}) => ({
  source: source || theme.images.logo.medium,
}))``;
