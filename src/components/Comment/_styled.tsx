import styled from 'styled-components/native';

export const CommentContainer = styled.View`
  background-color: ${({theme}) => theme.colors.ligth};
  border-radius: ${({theme}) => theme.borderRadius[12]};
  padding-bottom: ${({theme}) => theme.spacing[10]};
  padding-top: ${({theme}) => theme.spacing[15]};
  margin-bottom: ${({theme}) => theme.spacing.margin[15]};
  padding-left: 2px;
  padding-right: 2px;
`;

export const CommentHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing[15]};
  padding-right: ${({theme}) => theme.spacing[15]};
`;

export const CommentBody = styled.View`
  padding-left: 17px;
  padding-right: 17px;
  margin-bottom: ${({theme}) => theme.spacing[5]};
`;

export const CommentFooter = styled.View``;
