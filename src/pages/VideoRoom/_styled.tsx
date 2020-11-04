import styled from 'styled-components/native';

export const VideoRoomContainer = styled.SafeAreaView`
  height: 100%;
  position: relative;
  width: 100%;
  background-color: transparent;
  z-index: 2;
`;

export const VideoRoomHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
`;

export const VideoRoomBody = styled.View`
  flex: 1;
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
  justify-content: flex-end;
`;

export const VideoRoomFooter = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: ${({theme}) => theme.spacing[40]};
`;
