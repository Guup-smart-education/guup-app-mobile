import styled from 'styled-components/native';

export const InputWrapper = styled.View`
  width: 100%;
`;

export const InputComponent = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.colors.ligthGrey,
  allowFontScaling: false,
}))`
  height: 65px;
  border-radius: ${({theme}) => theme.borderRadius[12]};
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  color: ${({theme}) => theme.colors.dark};
  font-family: ${({theme}) => theme.fontFamily};
  font-size: ${({theme}) => theme.fontSize.medium};
  font-weight: ${({theme}) => theme.fontWeight.semiBold};
  text-align: center;
  /* text-align: left;
  padding-left: ${({theme}) => theme.spacing.padding[15]}; */
  width: 100%;
`;

export const FlagError = styled.View`
  width: 100%;
  height: ${({theme}) => theme.spacing[40]};
  padding-top: ${({theme}) => theme.spacing[10]};
  padding-bottom: ${({theme}) => theme.spacing[10]};
`;
