import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const PostContainer = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.ligth};
  /* border-radius: ${({theme}) => theme.borderRadius[8]}; */
  padding-top: ${({theme}) => theme.spacing[20]};
  padding-bottom: ${({theme}) => theme.spacing[10]};
`;

export const PostHeader = styled.View<{card: boolean}>`
  justify-content: space-between;
  flex: 1;
  flex-direction: row;
  padding-left: ${({theme, card}) =>
    card ? theme.spacing.padding[15] : theme.spacing.padding[25]};
  padding-right: ${({theme, card}) =>
    card ? theme.spacing.padding[15] : theme.spacing.padding[25]};
`;

export const PostBody = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const PostContent = styled.View<{card: boolean}>`
  padding-left: 5px;
  padding-right: 5px;
  padding-left: ${({theme, card}) =>
    card ? theme.spacing.padding[20] : theme.spacing[30]};
  padding-right: ${({theme, card}) =>
    card ? theme.spacing.padding[20] : theme.spacing[30]};
`;

export const PostActions = styled.View<{card: boolean}>`
  align-items: center;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${({theme}) => theme.spacing[5]};
  padding-left: ${({theme, card}) =>
    card ? theme.spacing.padding[20] : theme.spacing[30]};
  padding-right: ${({theme, card}) =>
    card ? theme.spacing.padding[20] : theme.spacing[30]};
`;

export const PostActionItem = styled.View`
  align-items: center;
`;

export const PostMedia = styled.View`
  width: 100%;
  height: ${Dimensions.get('window').width * 1.2}px;
  background-color: ${({theme}) => theme.colors.ligthGrey};
  justify-content: center;
  align-items: center;
`;

export const PostMediaImage = styled.ImageBackground`
  background-color: ${({theme}) => theme.colors.ligthGrey};
  width: 100%;
  flex: 1;
`;

export const PostMediaVideo = styled.View`
  height: 150px;
`;
