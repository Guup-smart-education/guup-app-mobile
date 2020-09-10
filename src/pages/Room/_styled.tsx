import styled from 'styled-components/native';

export const ClassRoomContainer = styled.ScrollView`
  width: 100%;
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
`;

export const ClassRoomData = styled.View`
  background-color: ${({theme}) => theme.colors.ligth};
  width: 100%;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing.padding[20]};
  padding-bottom: ${({theme}) => theme.spacing.padding[20]};
`;

export const ClassRoomHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ClassRoomTitle = styled.View`
  width: 75%;
`;

export const ClassRoomInfo = styled.View`
  width: 25%;
  align-items: flex-end;
`;

export const ClassRoomBody = styled.View`
  width: 100%;
`;

export const ClassRoomTabScroll = styled.ScrollView`
  background-color: ${({theme}) => theme.colors.ligth};
  width: 100%;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-top-color: ${({theme}) => theme.colors.veryLigthGrey};
  border-bottom-color: ${({theme}) => theme.colors.veryLigthGrey};
`;

export const ClassRoomTabs = styled.ScrollView`
  width: 100%;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing.padding[20]};
  padding-bottom: ${({theme}) => theme.spacing.padding[20]};
`;

export const ClassRoomContent = styled.View`
  /* background-color: ${({theme}) => theme.colors.ligth}; */
  width: 100%;
  padding-bottom: ${({theme}) => theme.spacing[20]};
`;

export const ClassRoomTabEmpty = styled.View`
  align-items: center;
  justify-content: center;
  padding-bottom: ${({theme}) => theme.spacing[50]};
  padding-top: ${({theme}) => theme.spacing[50]};
  width: 100%;
`;

export const ClassRoomTabEmptyText = styled.View`
  width: 65%;
`;
