import styled from 'styled-components/native';

export const Modal = styled.Modal`
  flex: 1;
  background-color: aliceblue;
`;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.ligth};
  align-items: center;
  justify-content: center;
`;
