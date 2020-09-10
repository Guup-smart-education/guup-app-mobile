import {Dimensions, ScrollViewProps} from 'react-native';
import styled from 'styled-components/native';

interface ScrollProps extends ScrollViewProps {}

export const CourseDetailContainer = styled.ScrollView`
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing.padding[15]};
  /* padding-bottom: ${({theme}) => theme.spacing.padding[25]}; */
  width: 100%;
`;

export const CourseDetailHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CourseDetailHeaderRight = styled.View`
  width: 75%;
`;

export const CourseDetailHeaderLeft = styled.View``;

export const CourseDetailContent = styled.View`
  width: ${Dimensions.get('screen').width + 'px'};
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.ligthGrey};
  margin-top: ${({theme}) => theme.spacing.margin[20]};
  margin-left: -25px;
`;

export const CourseTabContent = styled.View`
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
`;

export const FooterContainer = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.secondary};
  border-top-left-radius: ${({theme}) => theme.borderRadius[8]};
  border-top-right-radius: ${({theme}) => theme.borderRadius[8]};
  min-height: ${Dimensions.get('screen').width / 4 + 'px'};
  padding-top: ${({theme}) => theme.spacing.padding[15]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;

export const FooterLabels = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
