import styled from 'styled-components/native';
import {IProps} from './';

export const InputWrapper = styled.View`
  width: 100%;
  margin-bottom: ${({theme}) => theme.spacing[25]};
  position: relative;
`;

export const InputComponent = styled.TextInput.attrs(
  ({theme, placeholderTextColor = 'ligthGrey'}) => ({
    placeholderTextColor: theme.colors[placeholderTextColor],
  }),
)<IProps>`
  color: ${({theme}) => theme.colors.dark};
  font-family: ${({theme}) => theme.fontFamily};
  font-size: ${({theme, preset}) => {
    if (preset === 'title') {
      return theme.fontSize.bigger;
    } else if (preset === 'subtitle') {
      return theme.fontSize.large;
    }
    return theme.fontSize.medium;
  }};
  font-weight: ${({theme, preset}) => {
    if (preset === 'title' || preset === 'subtitle') {
      return theme.fontWeight.bold;
    }
    return theme.fontWeight.regular;
  }};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[15]};
  /* padding-top: ${({theme}) => theme.spacing.padding[25]}; */
  line-height: ${({theme}) => theme.spacing.lineHeigth.l24};
  width: 100%;
`;

export const FlagError = styled.View`
  width: 100%;
  /* padding-top: ${({theme}) => theme.spacing[10]}; */
  padding-bottom: ${({theme}) => theme.spacing[10]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  position: absolute;
  bottom: -${({theme}) => theme.spacing.padding[20]};
`;
