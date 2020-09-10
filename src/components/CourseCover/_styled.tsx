import styled from 'styled-components/native';

export const CourseCoverContainer = styled.View`
  background-color: ${({theme}) => theme.colors.ligth};
  width: 100%;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing.padding[15]};
  border-top-width: 1.5px;
  border-top-color: ${({theme}) => theme.colors.veryLigthGrey};
`;

export const CourseCoverHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CourseCoverBody = styled.View``;

export const CourseCoverFooter = styled.View`
  align-items: flex-end;
`;
