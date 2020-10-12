import styled from 'styled-components/native';
import {IProps} from './';

export const InputWrapper = styled.View`
  width: 100%;
  position: relative;
  justify-content: center;
`;

export const InputLeftIcon = styled.View`
  position: absolute;
  z-index: 2;
  margin-left: ${({theme}) => theme.spacing[10]};
`;

export const InputComponent = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.colors.ligthGrey,
  allowFontScaling: false,
}))<IProps>`
  height: 65px;
  border-radius: ${({theme}) => theme.borderRadius[12]};
  background-color: ${({theme}) => theme.colors.veryLigthGrey};
  color: ${({theme}) => theme.colors.dark};
  font-family: ${({theme}) => theme.fontFamily};
  font-size: ${({theme}) => theme.fontSize.regular};
  font-weight: ${({theme}) => theme.fontWeight.semiBold};
  text-align: ${({textAlign}) => textAlign};
  width: 100%;
  padding-left: ${({theme, leftIcon}) =>
    leftIcon ? theme.spacing[50] : theme.spacing[15]};
  padding-right: ${({theme}) => theme.spacing[15]};
`;

export const FlagError = styled.View`
  width: 100%;
  padding-top: ${({theme}) => theme.spacing[10]};
  padding-bottom: ${({theme}) => theme.spacing[10]};
`;
