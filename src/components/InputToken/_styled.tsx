import styled from 'styled-components/native';

export const TokenContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TokenInputBlock = styled.View`
  margin-left: ${({theme}) => theme.spacing[5]};
  margin-right: ${({theme}) => theme.spacing[5]};
  width: 55px;
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
