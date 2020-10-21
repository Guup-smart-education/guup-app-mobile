import styled from 'styled-components/native';

export const InputWrapper = styled.View`
  width: 100%;
`;

export const InputComponent = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.colors.ligthGrey,
}))`
  /* height: 100%; */
  border-radius: ${({theme}) => theme.borderRadius[12]};
  color: ${({theme}) => theme.colors.dark};
  font-family: ${({theme}) => theme.fontFamily};
  font-size: ${({theme}) => theme.fontSize.regular};
  font-weight: ${({theme}) => theme.fontWeight.regular};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
  /* padding-top: ${({theme}) => theme.spacing.padding[25]}; */
  line-height: ${({theme}) => theme.spacing.lineHeigth.l24};
  width: 100%;
`;

export const FlagError = styled.View`
  width: 100%;
  padding-top: ${({theme}) => theme.spacing[10]};
  padding-bottom: ${({theme}) => theme.spacing[10]};
`;
