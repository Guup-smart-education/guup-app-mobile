import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {hasNotch} from 'react-native-device-info';

export const ExplorerContainer = styled.View`
  flex: 1;
  /* margin-left: ${({theme}) => theme.spacing.padding[25]};
  margin-right: ${({theme}) => theme.spacing.padding[25]}; */
  width: 100%;
  height: 100%;
`;

export const ExplorerHeader = styled.SafeAreaView`
  width: 100%;
  background-color: ${({theme}) => theme.colors.ligth};
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
  padding-right: ${({theme}) => theme.spacing.padding[20]};
`;

export const ExplorerTabs = styled.ScrollView`
  width: 100%;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
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
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
`;

export const ExplorerFooter = styled.View``;

export const ExplorerCourseItem = styled.View`
  width: 100%;
`;

export const ExplorerEmptyList = styled.View`
  flex: 1;
  align-items: center;
  height: 100%;
  justify-content: center;
`;
