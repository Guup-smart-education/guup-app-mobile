import styled from 'styled-components/native';

export const EditContainer = styled.View`
  width: 100%;
  flex: 1;
`;

export const EditHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing[20]};
  padding-right: ${({theme}) => theme.spacing[20]};
`;

export const EditBody = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
