import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  width: 100%;
  padding-top: ${({theme}) => theme.spacing[10]};
  padding-bottom: ${({theme}) => theme.spacing[10]};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: relative;
  height: 54px;
  z-index: 2;
`;

export const HeaderLeftItem = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex: 1;
`;

export const HeaderRightItem = styled.View`
  align-items: flex-end;
  justify-content: center;
  flex: 1;
`;

export const HeaderCenterRenderItem = styled.View`
  width: 50%;
  top: 0;
  align-items: center;
  justify-content: center;
`;
