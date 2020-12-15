import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const CourseContainer = styled.View`
  background-color: ${({theme}) => theme.colors.ligth};
  border-radius: ${({theme}) => theme.borderRadius[8]};
  /* padding-top: ${({theme}) => theme.spacing.padding[20]}; */
  padding-bottom: ${({theme}) => theme.spacing[10]};
`;

export const CourseHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[15]};
  margin-bottom: ${({theme}) => theme.spacing[15]};
  z-index: 2;
`;

export const CourseTitle = styled.View`
  width: 65%;
`;

export const CourseAction = styled.View``;

export const CourseBody = styled.View`
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing[15]};
  padding-bottom: ${({theme}) => theme.spacing[15]};
  /* flex: 1; */
`;

export const CourseFooter = styled.View`
  /* border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.veryLigthGrey}; */
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
  /* padding-top: ${({theme}) => theme.spacing[10]}; */
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CourseFooterItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CourseData = styled.View`
  /* flex: 1; */
  width: 100%;
`;

export const CoursePrice = styled.View`
  /* flex: 1; */
  align-items: flex-end;
  margin-bottom: ${({theme}) => theme.spacing.margin[20]};
`;

export const CourseImage = styled.View`
  height: ${Dimensions.get('window').width * 1.2}px;
  width: 100%;
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  justify-content: space-between;
  padding-left: ${({theme}) => theme.spacing.margin[25]};
  padding-bottom: ${({theme}) => theme.spacing.margin[25]};
  padding-top: ${({theme}) => theme.spacing.margin[25]};
  padding-right: ${({theme}) => theme.spacing.margin[15]};
`;

export const CourseOwner = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
