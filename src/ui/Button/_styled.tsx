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
  border-radius: ${({theme}) => theme.borderRadius[8]};
  background-color: ${({disable, preset, theme, color}) => {
    return disable
      ? theme.colors.smoothGrey
      : preset === EPreset.solid
      ? theme.colors[color]
      : theme.colors.secondary;
  }};
  border-style: solid;
  height: ${({theme}) => theme.sizes.buttom[54]};
  ${({preset, theme}) =>
    preset === EPreset.outline && `border-width: ${theme.colors.primary}`};
  width: 100%;
`;
