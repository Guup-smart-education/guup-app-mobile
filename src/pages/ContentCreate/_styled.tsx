import styled from 'styled-components/native';

export const CreateContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const CreateHeader = styled.View`
  flex-direction: column;
  padding-left: ${({theme}) => theme.spacing[20]};
  padding-right: ${({theme}) => theme.spacing[20]};
  width: 100%;
`;

export const CreateBody = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({theme}) => theme.colors.ligth};
`;

export const CreateFooter = styled.View`
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.veryLigthGrey};
  width: 100%;
`;

export const CreateLockAction = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CreatePosterContent = styled.View`
  width: 100%;
  height: 260px;
`;

export const CreateFormContent = styled.View`
  width: 100%;
  padding-top: ${({theme}) => theme.spacing[20]};
  padding-bottom: ${({theme}) => theme.spacing[20]};
`;

export const FooterLabels = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
