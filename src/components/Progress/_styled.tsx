import styled from 'styled-components/native';

export const ProgressBarContainer = styled.View`
  width: 100%;
  height: 2px;
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  position: relative;
`;

export const ProgressBar = styled.View`
  position: absolute;
  background-color: ${({theme}) => theme.colors.primary};
  height: 2px;
  right: 0;
  left: 0;
  top: 0;
  right: 0;
  z-index: 2;
`;
