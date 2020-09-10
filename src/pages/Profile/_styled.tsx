import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const ProfileContainer = styled.ScrollView`
  background-color: ${({theme}) => theme.colors.ligth};
  width: 100%;
`;

export const ProfileuserPicture = styled.View`
  width: 100%;
  height: ${Dimensions.get('screen').width + 'px'};
  background-color: ${({theme}) => theme.colors.secondary};
  justify-content: flex-end;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[20]};
`;

export const ProfileuserData = styled.View`
  width: 50%;
`;

export const ProfileTabContent = styled.View`
  width: ${Dimensions.get('screen').width + 'px'};
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.ligthGrey};
  margin-top: ${({theme}) => theme.spacing.margin[20]};
  margin-left: -25px;
`;

export const ProfileBody = styled.View`
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;

export const CourseTabContent = styled.View`
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
`;
