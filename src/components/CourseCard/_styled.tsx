import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const CardOverlay = styled.View`
  background-color: ${({theme}) => theme.colors.ultraDark};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.2;
  z-index: 0;
`;

export const CardLoading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CardContainer = styled.View`
  width: 100%;
  border-radius: ${({theme}) => theme.borderRadius[8]};
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: azure;
  height: ${Dimensions.get('screen').width * 1.4}px;
`;

export const CardWrapper = styled.View`
  width: ${Dimensions.get('screen').width}px;
  width: 100%;
  flex: 1;
  background-color: ${({theme}) => theme.colors.ligth};
`;

export const CardSectionTop = styled.View`
  height: 100%;
  width: 100%;
`;

export const CardSectionHeader = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  padding-bottom: ${({theme}) => theme.spacing[15]};
  padding-top: ${({theme}) => theme.spacing[20]};
  padding-right: ${({theme}) => theme.spacing[25]};
  padding-left: ${({theme}) => theme.spacing[25]};
  position: relative;
`;

export const CardSectionTitle = styled.View`
  width: 75%;
  margin-bottom: ${({theme}) => theme.spacing[15]};
  z-index: 1;
`;

export const CardTitle = styled.View`
  width: 100%;
`;

export const CardOwner = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: ${({theme}) => theme.spacing[15]};
  width: 100%;
  z-index: 1;
`;

export const CardSectionBody = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({theme}) => theme.spacing[20]};
  padding-top: ${({theme}) => theme.spacing[15]};
  padding-right: ${({theme}) => theme.spacing[25]};
  padding-left: ${({theme}) => theme.spacing[25]};
`;

export const CardContent = styled.View`
  padding-right: ${({theme}) => theme.spacing.padding[20]};
`;

export const CardActions = styled.View`
  align-items: flex-start;
  flex: 1;
  width: 100%;
  align-items: flex-end;
  z-index: 1;
`;

export const CardBottomActions = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardShowMoreContainer = styled.View`
  max-height: ${Dimensions.get('screen').height / 3}px;
  width: 100%;
`;
