import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {hasNotch} from 'react-native-device-info';

export const ExplorerContainer = styled.View`
  /* flex: 1; */
  /* margin-left: ${({theme}) => theme.spacing.padding[25]};
  margin-right: ${({theme}) => theme.spacing.padding[25]}; */
  width: 100%;
  height: 100%;
`;

export const ExplorerHeader = styled.SafeAreaView`
  width: 100%;
  /* background-color: ${({theme}) => theme.colors.ligth}; */
  position: absolute;
  /* padding-bottom: ${({theme}) => theme.spacing.padding[25]}; */
  /* top: ${hasNotch() ? 48 : 20}px; */
  /* left: 0;
  z-index: 9999; */
`;

export const ExplorerHeaderPatch = styled.View`
  width: 100%;
  height: 60px;
  background-color: ${({theme}) => theme.colors.ligth};
  position: absolute;
  bottom: 100%;
`;

export const ExplorerAction = styled.View`
  width: 100%;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;

export const ExplorerTabs = styled.ScrollView`
  width: 100%;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  /* padding-right: ${({theme}) => theme.spacing.padding[25]}; */
`;

export const ExplorerEmpty = styled.View`
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing.padding[25]};
`;

export const ExplorerTitle = styled.View`
  width: 70%;
`;

export const ExplorerBody = styled.View`
  flex: 1;
`;

export const ExplorerFooter = styled.View``;

export const ExplorerCourseItem = styled.View`
  width: 100%;
  height: ${Dimensions.get('screen').height}px;
  /* padding-bottom: ${hasNotch() ? 84 : 50}px; */
  /* height: ${Dimensions.get('screen').height - (hasNotch() ? 84 : 50)}px; */
  /* height: ${
    Dimensions.get('screen').height - 70 - (hasNotch() ? 14 : 0)
  }px; */
  /* background-color: blueviolet; */
  /* padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]}; */
`;
