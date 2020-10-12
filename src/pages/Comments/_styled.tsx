import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const CommentsContainer = styled.View`
  width: 100%;
  flex: 1;
  position: relative;
`;

export const CommentsDetailContainer = styled.View`
  background-color: ${({theme}) => theme.colors.ligth};
  width: 100%;
`;

export const CommentsDetail = styled.ScrollView`
  /* padding-left: ${({theme}) => theme.spacing[10]};
  padding-right: ${({theme}) => theme.spacing[10]}; */
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
`;

export const CommentsList = styled.View`
  width: 100%;
  flex: 1;
`;

export const CommentListItem = styled.View`
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;

export const FooterContainer = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.dark};
  min-height: ${Dimensions.get('screen').width / 5 + 'px'};
  padding-top: ${({theme}) => theme.spacing.padding[15]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;

export const CommentsActions = styled.View`
  width: 100%;
  align-items: center;
`;

export const CommentNav = styled.View`
  width: 100%;
  padding-left: ${({theme}) => theme.spacing.padding[20]};
  padding-right: ${({theme}) => theme.spacing.padding[20]};
  background-color: ${({theme}) => theme.colors.ligth};
`;
