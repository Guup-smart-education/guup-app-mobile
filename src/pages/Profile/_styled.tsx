import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const ProfileContainer = styled.View`
  /* background-color: ${({theme}) => theme.colors.contrast}; */
  width: 100%;
  flex: 1;
`;

export const ProfileTop = styled.View`
  width: 100%;
  height: 49.2%;
  justify-content: space-between;
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
`;

export const ProfileBottom = styled.View`
  flex: 1;
  width: 100%;
`;

export const ProfileHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing.padding[15]};
  width: 100%;
`;

export const ProfileUserPicture = styled.ImageBackground`
  z-index: -1;
  height: ${Dimensions.get('screen').height / 2 + 'px'};
  /* height: ${Dimensions.get('screen').height / 2 + 'px'}; */
  background-color: ${({theme}) => theme.colors.dark};
`;

export const ProfileuserData = styled.View`
  width: 70%;
  justify-content: flex-end;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
`;

export const ProfileContent = styled.View`
  width: 100%;
`;

export const ProfileBody = styled.View`
  width: 100%;
  flex: 1;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;

export const ProfileEditContainer = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  padding-top: ${({theme}) => theme.spacing[25]};
`;

export const ProfileEditHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
  padding-top: ${({theme}) => theme.spacing[25]};
  padding-bottom: ${({theme}) => theme.spacing[25]};
  width: 75%;
`;

export const ProfileEditBody = styled.View`
  flex: 1;
`;

export const ProfileEditFooter = styled.View`
  height: 64px;
`;
