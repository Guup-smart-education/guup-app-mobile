import styled from 'styled-components/native';

export const ModuleRoomContainer = styled.ScrollView`
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  width: 100%;
`;

export const ModuleRoomData = styled.View`
  background-color: ${({theme}) => theme.colors.ligth};
  width: 100%;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing.padding[20]};
  padding-bottom: ${({theme}) => theme.spacing.padding[20]};
`;

export const ModuleRoomHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ModuleRoomTitle = styled.View`
  width: 75%;
`;

export const ModuleRoomInfo = styled.View`
  width: 25%;
  align-items: flex-end;
`;

export const ModuleRoomBody = styled.View`
  width: 100%;
`;

export const ModuleRoomContent = styled.View`
  /* background-color: ${({theme}) => theme.colors.ligth}; */
  width: 100%;
  padding-bottom: ${({theme}) => theme.spacing[20]};
`;

export const ModuleLessonGroup = styled.View`
  width: 100%;
`;

export const ModuleLessonTitle = styled.View`
  background-color: ${({theme}) => theme.colors.ligth};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing[10]};
  padding-bottom: ${({theme}) => theme.spacing[15]};
`;
