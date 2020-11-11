import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {hasNotch} from 'react-native-device-info';

export const CardContainer = styled.ImageBackground`
  width: 100%;
  height: 100%;
  padding-top: ${hasNotch() ? 28 : 0}px;
  padding-bottom: ${20 + (hasNotch() ? 84 : 50)}px;
  justify-content: flex-end;
  /* align-items: center; */
`;

export const CardWrapper = styled.View`
  width: 100%;
  flex: 1;
  /* justify-content: center;
  align-items: center; */
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[20]};
  padding-top: 75px;
  /* background-color: cornflowerblue; */
`;

export const CardSectionTop = styled.View`
  height: 100%;
  width: 100%;
`;

export const CardSectionHeader = styled.View`
  width: 100%;
`;

export const CardSectionTitle = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding-bottom: ${({theme}) => theme.spacing.padding[20]};
`;

export const CardTitle = styled.View`
  width: 80%;
`;

export const CardDescription = styled.View`
  width: 100%;
  background-color: burlywood;
  flex: 1;
  justify-content: space-between;
`;

export const CardSectionBody = styled.View`
  /* flex-grow: 1; */
  width: 100%;
`;

export const CardContent = styled.View`
  padding-right: ${({theme}) => theme.spacing.padding[20]};
`;

export const CardActions = styled.View`
  align-items: flex-start;
  flex: 1;
  width: 100%;
  align-items: flex-end;
`;

export const CardBottomActions = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardShowMoreContainer = styled.View`
  max-height: ${Dimensions.get('screen').height / 3}px;
  width: 100%;
`;
