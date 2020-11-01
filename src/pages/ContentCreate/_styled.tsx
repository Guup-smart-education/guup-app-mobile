import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const CreateContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const CreateHeader = styled.View`
  flex-direction: column;
  padding-left: ${({theme}) => theme.spacing[20]};
  padding-right: ${({theme}) => theme.spacing[20]};
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.ligthGrey};
`;

export const CreateBody = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({theme}) => theme.colors.ligth};
  /* justify-content: space-between; */
`;

export const CreateFooter = styled.View`
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.veryLigthGrey};
  width: 100%;
`;

export const CreateMedia = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  /* min-height: ${Dimensions.get('screen').width - 50}px; */
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.View`
  width: 100%;
  /* flex: 1; */
  /* padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]}; */
`;

export const FooterLabels = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
