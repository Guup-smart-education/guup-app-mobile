import styled from 'styled-components/native';

export const GainContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const GainHeader = styled.View``;

export const GainBody = styled.View`
  flex: 1;
`;

export const GainImage = styled.ImageBackground`
  height: ${({theme}) => theme.sizes.avatar[48]};
  width: ${({theme}) => theme.sizes.avatar[48]};
  background-color: ${({theme}) => theme.colors.ligthGrey};
  border-radius: ${({theme}) => theme.borderRadius[4]};
  margin-right: ${({theme}) => theme.spacing.margin[25]};
`;
