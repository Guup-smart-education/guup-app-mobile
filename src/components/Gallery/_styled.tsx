import styled from 'styled-components/native';

export const UploadContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const MediaContainer = styled.ImageBackground`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
`;

export const MediaTextContent = styled.View`
  max-width: 175px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const LoadingIndicator = styled.ActivityIndicator`
  color: ${({theme}) => theme.colors.primary};
`;

export const TextInputNone = styled.TextInput`
  position: absolute;
  bottom: 0;
`;
