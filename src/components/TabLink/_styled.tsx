import styled from 'styled-components/native';

export const TabLinkContainer = styled.View`
  flex-direction: row;
  width: 100%;
  /* justify-content: space-between; */
`;

export const TabLinkItem = styled.View`
  margin-right: ${({theme}) => theme.spacing[20]};
`;

export const TabLinkTouch = styled.TouchableWithoutFeedback``;
