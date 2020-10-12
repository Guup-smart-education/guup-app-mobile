import styled from 'styled-components/native';

export const CardContainer = styled.View`
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.ligth};
  border-radius: ${({theme}) => theme.borderRadius[8]};
  padding-left: ${({theme}) => theme.spacing[20]};
  padding-right: ${({theme}) => theme.spacing[20]};
  padding-top: ${({theme}) => theme.spacing[20]};
  padding-bottom: ${({theme}) => theme.spacing[25]};
`;

export const CardLeftSection = styled.View`
  /* flex: 1; */
  /* background-color: aliceblue; */
`;

export const CardRightSection = styled.View`
  flex: 1;
  padding-left: ${({theme}) => theme.spacing[15]};
  /* background-color: aquamarine; */
`;
