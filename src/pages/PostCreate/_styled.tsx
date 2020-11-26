import styled from 'styled-components/native';

export const CreateContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const CreateHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing[15]};
  padding-right: ${({theme}) => theme.spacing[20]};
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.ligthGrey};
  background-color: ${({theme}) => theme.colors.ligth};
`;

export const CreateBody = styled.View`
  flex: 1;
  padding-top: ${({theme}) => theme.spacing[20]};
  width: 100%;
`;

export const CreateFooter = styled.View`
  width: 100%;
  background-color: azure;
`;

export const CreateDescription = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
  width: 100%;
`;

export const CreateTitle = styled.View``;

export const CreateImage = styled.View`
  height: 64px;
  width: 64px;
  border-radius: ${({theme}) => theme.borderRadius[8]};
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  overflow: hidden;
`;

export const CreateInput = styled.View`
  width: 100%;
`;

export const CreateActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
