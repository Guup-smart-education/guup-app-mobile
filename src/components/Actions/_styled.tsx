import styled from 'styled-components/native';

export const Actions = styled.View`
  margin-bottom: ${({theme}) => theme.spacing.margin[25]};
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: row;
  padding-left: ${({theme, noPadding}) =>
    noPadding ? 0 : theme.spacing.padding[40]};
  padding-right: ${({theme, noPadding}) =>
    noPadding ? 0 : theme.spacing.padding[40]};
`;
