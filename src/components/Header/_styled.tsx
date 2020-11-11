import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  width: 100%;
  padding-top: ${({theme}) => theme.spacing[10]};
  padding-bottom: ${({theme}) => theme.spacing[10]};
  justify-content: space-between;
  flex-direction: row;
  position: relative;
`;

export const HeaderLeftItem = styled.View`
  /* width: 25%; */
  align-items: flex-start;
  justify-content: center;
`;

export const HeaderRightItem = styled.View`
  /* width: 25%; */
  align-items: flex-end;
  justify-content: center;
`;

export const HeaderCenterRenderItem = styled.View`
  width: 50%;
  top: 0;
  align-items: center;
  justify-content: center;
`;
