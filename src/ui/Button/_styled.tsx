import styled from 'styled-components/native';
import {EColors, EPreset} from './';

type IProps = {
  readonly color?: keyof typeof EColors;
  readonly disable?: boolean;
  readonly block?: boolean;
  readonly preset?: keyof typeof EPreset;
};

export const ButtonWrapper = styled.View<IProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 24px;
  padding-left: 24px;
  padding-bottom: 5px;
  border-radius: ${({theme}) => theme.borderRadius[8]};
  background-color: ${({disable, preset, theme, color}) => {
    return disable
      ? theme.colors.smoothGrey
      : preset === EPreset.solid
      ? theme.colors[color || 'primary']
      : preset === EPreset.outline
      ? theme.colors.ligth
      : preset === EPreset.light
      ? theme.colors.veryLigthGrey
      : theme.colors.secondary;
  }};
  border-style: solid;
  height: ${({theme}) => theme.sizes.buttom[54]};
  ${({preset, theme}) =>
    preset === EPreset.outline &&
    `border-width: 2; border-color: ${theme.colors.primary}`};
  width: 100%;
`;
