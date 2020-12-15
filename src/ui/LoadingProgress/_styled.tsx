import styled from 'styled-components/native';

export const ProgressContainer = styled.View`
  height: 44px;
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  border-radius: ${({theme}) => theme.borderRadius[8]};
  justify-content: center;
  padding-left: ${({theme}) => theme.spacing[15]};
`;
