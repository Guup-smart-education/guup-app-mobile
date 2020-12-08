import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const CreateContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const CreateHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing[15]};
  padding-right: ${({theme}) => theme.spacing[20]};
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.ligthGrey};
  background-color: ${({theme}) => theme.colors.ligth};
`;

export const CreateBody = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const CreateFooter = styled.View`
  width: 100%;
  /* flex: 1; */
`;

export const CreateDescription = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
  width: 100%;
`;

export const CreateTitle = styled.View``;

export const CreateImage = styled.ImageBackground`
  height: ${Dimensions.get('window').width}px;
  width: 100%;
  background-color: ${({theme}) => theme.colors.dark};
  align-items: center;
  justify-content: center;
`;

export const CreateMedia = styled.View`
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
  margin-top: 25px;
`;

export const CreateInput = styled.View`
  margin-top: 25px;
  width: 100%;
`;

export const CreateActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
