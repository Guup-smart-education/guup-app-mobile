import styled from 'styled-components/native';

export const ContainerInputs = styled.View`
  width: 100%;
  position: relative;
  align-items: center;
`;

export const TokenInput = styled.TextInput`
  height: 65px;
  border-radius: ${({theme}) => theme.borderRadius[12]};
  background-color: ${({theme}) => theme.colors.smoothGrey};
  color: ${({theme}) => theme.colors.dark};
  font-family: ${({theme}) => theme.fontFamily};
  font-size: ${({theme}) => theme.fontSize.medium};
  font-weight: ${({theme}) => theme.fontWeight.semiBold};
  text-align: center;
  margin-left: ${({theme}) => theme.spacing[5]};
  margin-right: ${({theme}) => theme.spacing[5]};
  width: 55px;
`;

export const ExpireTime = styled.View`
  position: absolute;
  bottom: -32px;
`;
