import styled from 'styled-components/native';

export const HeaderPatch = styled.View`
  width: 100%;
  height: 60px;
  background-color: ${({theme}) => theme.colors.ligth};
  position: absolute;
  bottom: 100%;
`;

export const FooterPatch = styled.View`
  width: 100%;
  height: 60px;
  background-color: ${({theme}) => theme.colors.dark};
  position: absolute;
  bottom: 100%;
  bottom: 0;
`;
