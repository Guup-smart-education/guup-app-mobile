import {Dimensions, ScrollViewProps} from 'react-native';
import styled from 'styled-components/native';

interface ScrollProps extends ScrollViewProps {}

export const CourseDetailContainer = styled.View`
  width: 100%;
  flex: 1;
  position: relative;
`;

export const CourseDetailHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing[30]};
  background-color: ${({theme}) => theme.colors.ligth};
`;

export const CourseDetailHeaderTop = styled.View``;
export const CourseDetailHeaderBody = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const CourseDetailHeaderBottom = styled.View``;

export const CourseDetailHeaderRight = styled.View`
  width: 75%;
`;

export const CourseDetailHeaderLeft = styled.View``;

export const CourseDetailContent = styled.View`
  /* padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]}; */
`;

export const CourseTabContent = styled.View`
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
`;

export const FooterContainer = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.dark};
  min-height: ${Dimensions.get('screen').width / 5 + 'px'};
  padding-top: ${({theme}) => theme.spacing.padding[15]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;

export const FooterLabels = styled.View`
  align-items: center;
  justify-content: center;
`;
