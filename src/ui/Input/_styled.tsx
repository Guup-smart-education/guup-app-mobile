import styled from 'styled-components/native';

export const InputWrapper = styled.View`
  width: 100%;
`;

export const InputComponent = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.colors.ligthGrey,
}))`
  height: 65px;
  border-radius: ${({theme}) => theme.borderRadius[12]};
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  color: ${({theme}) => theme.colors.dark};
  font-family: ${({theme}) => theme.fontFamily};
  font-size: ${({theme}) => theme.fontSize.medium};
  font-weight: ${({theme}) => theme.fontWeight.semiBold};
  text-align: center;
  width: 100%;
`;

export const FlagError = styled.View`
  width: 100%;
  padding-top: ${({theme}) => theme.spacing[10]};
  padding-bottom: ${({theme}) => theme.spacing[10]};
`;
