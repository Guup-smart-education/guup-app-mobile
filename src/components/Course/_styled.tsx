import styled from 'styled-components/native';

export const CourseContainer = styled.View`
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  border-radius: ${({theme}) => theme.borderRadius[8]};
  flex: 1;
  padding-top: ${({theme}) => theme.spacing.padding[20]};
  padding-left: ${({theme}) => theme.spacing.padding[20]};
  padding-right: ${({theme}) => theme.spacing.padding[20]};
  padding-bottom: ${({theme}) => theme.spacing.padding[20]};
`;

export const CourseContent = styled.View`
  flex: 1;
`;

export const CourseData = styled.View`
  flex: 1;
  width: 70%;
`;

export const CoursePrice = styled.View`
  flex: 1;
  align-items: flex-end;
  margin-bottom: ${({theme}) => theme.spacing.margin[20]};
`;
