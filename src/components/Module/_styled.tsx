import styled from 'styled-components/native';

export const ModuleContainer = styled.View`
  /* flex-direction: row; */
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  justify-content: space-between;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.veryLigthGrey};
  /* border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.ligthGrey}; */
`;

export const ModuleContent = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const ModulePicure = styled.View`
  background-color: ${({theme}) => theme.colors.ligthGrey};
  border-radius: 4px;
  height: 48px;
  width: 48px;
  margin-right: 22px;
`;

export const ModuleData = styled.View`
  /* flex-grow: 1; */
  flex: 1;
`;

export const ModuleContentProgress = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const ModuleProgressItem = styled.View`
  align-items: center;
  justify-content: center;
  min-height: 36px;
  width: 48px;
  margin-right: 22px;
`;

export const ModuleProgressData = styled.View`
  /* flex-grow: 1; */
  flex: 1;
`;
