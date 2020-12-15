import styled from 'styled-components/native';

export const BlockLoadingContainer = styled.View`
  background-color: ${({theme}) => theme.colors.ultraDark};
  opacity: 0.8;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
