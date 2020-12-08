import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {EColors} from './../../@enum/color.enum';
import {EPreset} from './';

type IProps = {
  readonly color?: keyof typeof EColors;
  readonly disable?: boolean;
  readonly loading?: boolean;
  readonly center?: boolean;
  readonly preset?: keyof typeof EPreset;
};

export const LinkWrapper = styled.View<IProps>`
  position: relative;
  height: 36px;
  padding-right: ${({theme}) => theme.spacing.padding[15]};
  padding-left: ${({theme}) => theme.spacing.padding[15]};
  border-radius: ${({theme}) => theme.borderRadius[4]};
  align-items: center;
  justify-content: center;
  background-color: ${({disable, preset, theme, color}) => {
    return disable
      ? theme.colors.smoothGrey
      : preset === EPreset.solid
      ? theme.colors[color || 'primary']
      : theme.colors.secondary;
  }};
  border-style: solid;
  /* opacity: ${({loading, disable}) => (loading || disable ? 0.5 : 1)}; */
  overflow: hidden;
  ${({preset, theme, color}) =>
    preset === EPreset.outline &&
    `border-width: 2px; background-color: transparent; border-color: ${
      theme.colors[color || 'primary']
    }`};
`;

export const Link = styled.Text.attrs({
  allowFontScaling: false,
})<IProps>`
  color: ${({theme, color, preset}) =>
    preset === EPreset.solid && color === EColors.contrast
      ? theme.colors.dark
      : preset === EPreset.solid
      ? theme.colors.ligth
      : theme.colors[color || 'dark']};
  font-family: ${({theme}) =>
    Platform.OS === 'ios'
      ? theme.fontFamily
      : theme.fontFamilyAndroid.semiBold};
  font-weight: ${({theme}) => theme.fontWeight.semiBold};
  font-size: ${({theme}) => theme.fontSize.medium};
  text-decoration: underline
    ${({theme, color, preset}) =>
      preset === EPreset.solid && color === EColors.contrast
        ? theme.colors.dark
        : preset === EPreset.solid
        ? theme.colors.ligth
        : theme.colors[color || 'dark']};
  letter-spacing: -0.45px;
  text-align: ${({center}) => (center ? 'center' : 'left')} /* opacity: ${({
      loading,
      disable,
    }) => (loading || disable ? 0.5 : 1)}; */
    ${({loading}) =>
      loading &&
      `color: transparent;
  text-decoration: none;`};
`;

export const LinkOverlay = styled.View`
  position: absolute;
  z-index: 2;
  padding-top: 4px;
  padding-bottom: 6px;
  width: 100%;
  padding-top: 4px;
  padding-bottom: 6px;
  padding-right: ${({theme}) => theme.spacing.padding[15]};
  padding-left: ${({theme}) => theme.spacing.padding[15]};
`;

export const LinkLoadingIndicator = styled.ActivityIndicator.attrs(
  ({theme, color}) => ({
    color: theme.colors[color || 'contrast'],
  }),
)``;
