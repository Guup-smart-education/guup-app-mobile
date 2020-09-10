import styled from 'styled-components/native';

export const DotListContainer = styled.View`
  width: 100%;
`;

export const DotListItem = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: ${({theme}) => theme.spacing.margin[15]};
`;

export const DotListDot = styled.View`
  background-color: ${({theme}) => theme.colors.ultraDark};
  height: ${({theme}) => theme.spacing[5]};
  width: ${({theme}) => theme.spacing[5]};
  border-radius: 5px;
  margin-top: ${({theme}) => theme.spacing[10]};
`;

export const DotListContent = styled.View`
  margin-left: ${({theme}) => theme.spacing[15]};
`;
