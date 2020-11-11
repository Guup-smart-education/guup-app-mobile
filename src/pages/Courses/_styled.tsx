import styled from 'styled-components/native';

export const CoursesContainer = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
`;

export const CoursesHeader = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.ligth};
  align-items: center;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;

export const CourseBody = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  /* padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]}; */
`;

export const CoursesContent = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.ligth};
`;

export const CourseEmpty = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  align-items: center;
  justify-content: center;
  padding-top: ${({theme}) => theme.spacing.padding[50]};
  padding-bottom: ${({theme}) => theme.spacing.padding[50]};
`;

export const CourseItem = styled.View`
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;
