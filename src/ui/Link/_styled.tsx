import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {EColors, EPreset} from './';

type IProps = {
  readonly color?: keyof typeof EColors;
  readonly disable?: boolean;
  readonly loading?: boolean;
  readonly preset?: keyof typeof EPreset;
};

export const LinkWrapper = styled.View<IProps>`
  padding-top: 4px;
  padding-bottom: 6px;
  padding-right: ${({theme}) => theme.spacing.padding[15]};
  padding-left: ${({theme}) => theme.spacing.padding[15]};
  border-radius: ${({theme}) => theme.borderRadius[4]};
  background-color: ${({disable, preset, theme}) => {
    return disable
      ? theme.colors.smoothGrey
      : preset === EPreset.solid
      ? theme.colors.primary
      : theme.colors.secondary;
  }};
  border-style: solid;
  opacity: ${({loading, disable}) => (loading || disable ? 0.5 : 1)};
  ${({preset, theme}) =>
    preset === EPreset.outline && `border-width: ${theme.colors.primary}`};
`;

export const Link = styled.Text<IProps>`
  color: ${({theme, color, preset}) =>
    preset === EPreset.solid
      ? theme.colors.ligth
      : theme.colors[color || 'dark']};
  font-family: ${({theme}) =>
    Platform.OS === 'ios'
      ? theme.fontFamily
      : theme.fontFamilyAndroid.semiBold};
  font-weight: ${({theme}) => theme.fontWeight.semiBold};
  font-size: ${({theme}) => theme.fontSize.regular};
  text-decoration: underline
    ${({theme, color, preset}) =>
      preset === EPreset.solid
        ? theme.colors.ligth
        : theme.colors[color || 'dark']};
  letter-spacing: -0.45px;
  opacity: ${({loading, disable}) => (loading || disable ? 0.5 : 1)};
`;
