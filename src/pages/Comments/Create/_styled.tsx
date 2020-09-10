import styled from 'styled-components/native';

export const CreateCommentContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  align-items: center;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const CreateCommentInputArea = styled.View`
  flex: 1;
  width: 100%;
`;

export const CreateCommentFooter = styled.View`
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.veryLigthGrey};
  width: 100%;
`;
