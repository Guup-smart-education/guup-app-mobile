import styled from 'styled-components/native';

export const Dot = styled.View`
  height: 5px;
  width: 5px;
  border-radius: 2.5px;
  background-color: ${({theme}) => theme.colors.ultraDark};
  margin-left: ${({theme}) => theme.spacing[10]};
  margin-right: ${({theme}) => theme.spacing[10]};
`;
