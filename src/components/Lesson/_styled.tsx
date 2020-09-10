import styled from 'styled-components/native';

export const LessonContainer = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.ligth};
  /* padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]}; */
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.veryLigthGrey};
`;

export const LessonType = styled.View`
  margin-right: ${({theme}) => theme.spacing.margin[15]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing.padding[25]};
`;

export const LessonContent = styled.View`
  flex: 1;
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing[40]};
`;

export const LessonDescription = styled.View`
  margin-bottom: ${({theme}) => theme.spacing[15]};
`;

export const LessonInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LessonProgressBackground = styled.View`
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  position: absolute;
  height: 100%;
  border-top-right-radius: ${({theme}) => theme.borderRadius[4]};
  border-bottom-right-radius: ${({theme}) => theme.borderRadius[4]};
  /* opacity: .1; */
`;

export const LessonProgress = styled.View`
  background-color: ${({theme}) => theme.colors.secondary};
  position: absolute;
  height: 2px;
  bottom: ${({theme}) => theme.spacing[15]};
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
`;
