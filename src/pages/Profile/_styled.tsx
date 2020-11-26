import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const ProfileContainer = styled.SafeAreaView`
  /* background-color: ${({theme}) => theme.colors.ligth}; */
  width: 100%;
  position: relative;
  height: 100%;
`;

export const ProfileHeader = styled.View`
  width: 100%;
  padding-left: ${({theme}) => theme.spacing.padding[15]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;

export const ProfileUserPicture = styled.ImageBackground`
  width: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  height: ${Dimensions.get('screen').height / 1.8 + 'px'};
  background-color: ${({theme}) => theme.colors.secondary};
  justify-content: flex-end;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[20]};
`;

export const ProfileuserData = styled.View`
  width: 70%;
  /* height: ${Dimensions.get('screen').height / 2 - 64 + 'px'}; */
  justify-content: flex-end;
  padding-bottom: ${({theme}) => theme.spacing.padding[20]};
`;

export const ProfileContent = styled.View`
  width: 100%;
`;

export const ProfileBody = styled.View`
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
