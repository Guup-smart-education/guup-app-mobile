import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const ExplorerContainer = styled.View`
  /* background-color: aqua; */
  flex: 1;
  /* padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]}; */
  margin-left: ${({theme}) => theme.spacing.padding[25]};
  margin-right: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
  width: 100%;
  height: 100%;
`;

export const HeaderStyle = styled.View`
  width: 80%;
  /* padding-left: 20%;
  padding-left: 20%; */
`;

export const ExplorerCourseItem = styled.View`
  flex: 1;
  width: ${Dimensions.get('screen').width + 'px'};
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
`;
