import styled from 'styled-components/native';

export const CourseContainer = styled.View`
  background-color: ${({theme}) => theme.colors.ligth};
  border-radius: ${({theme}) => theme.borderRadius[8]};
  padding-top: ${({theme}) => theme.spacing.padding[20]};
  padding-bottom: ${({theme}) => theme.spacing[10]};
`;

export const CourseHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-left: ${({theme}) => theme.spacing.padding[20]};
  padding-right: ${({theme}) => theme.spacing.padding[20]};
  margin-bottom: ${({theme}) => theme.spacing[5]};
`;

export const CourseTitle = styled.View`
  width: 85%;
`;

export const CourseAction = styled.View``;

export const CourseBody = styled.View`
  padding-left: ${({theme}) => theme.spacing.padding[20]};
  padding-right: ${({theme}) => theme.spacing.padding[20]};
  padding-top: ${({theme}) => theme.spacing[10]};
  padding-bottom: ${({theme}) => theme.spacing[25]};
  /* flex: 1; */
`;

export const CourseFooter = styled.View`
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.veryLigthGrey};
  padding-left: ${({theme}) => theme.spacing[30]};
  padding-right: ${({theme}) => theme.spacing[30]};
  padding-top: ${({theme}) => theme.spacing[10]};
  flex-direction: row;
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
