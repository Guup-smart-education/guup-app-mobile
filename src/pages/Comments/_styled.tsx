import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const CommentsContainer = styled.View`
  width: 100%;
  flex: 1;
`;

export const CommentsDetailContainer = styled.View`
  background-color: ${({theme}) => theme.colors.ligth};
  padding-top: ${({theme}) => theme.spacing.padding[15]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
  width: 100%;
`;

export const CommentsDetail = styled.ScrollView`
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  width: 100%;
`;
export const CommentsContent = styled.View`
  align-items: center;
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  flex: 1;
  justify-content: center;
  width: 100%;
`;
export const CommentsEmpty = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  width: 100%;
`;

export const CommentsList = styled.ScrollView`
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  width: 100%;
`;

export const FooterContainer = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.secondary};
  min-height: ${Dimensions.get('screen').width / 4 + 'px'};
  padding-top: ${({theme}) => theme.spacing.padding[15]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  border-top-left-radius: ${({theme}) => theme.borderRadius[8]};
  border-top-right-radius: ${({theme}) => theme.borderRadius[8]};
`;

export const CommentsActions = styled.View`
  width: 100%;
  align-items: center;
`;
