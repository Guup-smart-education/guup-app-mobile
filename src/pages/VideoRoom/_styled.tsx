import styled from 'styled-components/native';

export const VideoRoomContainer = styled.SafeAreaView`
  height: 100%;
  position: relative;
  width: 100%;
  background-color: transparent;
  z-index: 2;
  justify-content: space-between;
`;

export const VideoRoomHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing[15]};
  padding-right: ${({theme}) => theme.spacing[20]};
`;

export const VideoRoomBody = styled.View`
  flex: 0.9;
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
  padding-bottom: ${({theme}) => theme.spacing[25]};
  justify-content: flex-end;
`;

export const VideoRoomFooter = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: ${({theme}) => theme.spacing[40]};
  flex: 0.1;
`;

export const VideoTitleContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;

export const VideoTitle = styled.View`
  width: 75%;
`;

export const VideoControls = styled.View`
  width: 100%;
`;
