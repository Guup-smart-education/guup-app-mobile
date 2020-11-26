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
  background-color: ${({theme}) => theme.colors.ligth};
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.ligthGrey};
`;

export const CourseDetailDataContent = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.ligth};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
  /* border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.ligthGrey}; */
`;

export const CourseDetailDataBody = styled.View`
  padding-top: ${({theme}) => theme.spacing.padding[20]};
  flex-direction: row;
  justify-content: space-between;
`;
export const CourseDetailDataBottom = styled.View``;

export const CourseDetailDataRight = styled.View`
  width: 75%;
`;

export const CourseDetailDataLeft = styled.View``;

export const CourseDetailContent = styled.View`
  flex: 1;
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
`;

export const CourseTabContent = styled.View`
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
`;

export const FooterLabels = styled.View`
  align-items: center;
  justify-content: center;
`;

export const CourseDetailItem = styled.View`
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;

export const CourseListFooter = styled.View`
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  margin-top: ${({theme}) => theme.spacing.margin[25]};
  margin-bottom: ${({theme}) => theme.spacing.margin[25]};
`;
