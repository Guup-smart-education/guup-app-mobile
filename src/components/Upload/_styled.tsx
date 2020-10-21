import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

// const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const UploadContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const MediaContainer = styled.ImageBackground`
  flex: 1;
  width: 100%;
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  align-items: center;
  justify-content: center;
`;

export const MediaTextContent = styled.View`
  width: 175px;
  align-items: center;
  justify-content: center;
`;

export const LoadingIndicator = styled.ActivityIndicator`
  color: ${({theme}) => theme.colors.primary};
`;

export const TextInputNone = styled.TextInput`
  background-color: aqua;
  position: absolute;
  bottom: 0;
`;
