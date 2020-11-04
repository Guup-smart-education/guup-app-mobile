import styled, {DefaultTheme} from 'styled-components/native';
import {IProps} from './';

export interface IStyledProps extends IProps {
  readonly theme: DefaultTheme;
}

export const Icon = styled.Image.attrs(({source, theme}: IStyledProps) => ({
  source: (theme.icons as any)[source],
}))<IStyledProps>`
  border-radius: ${({theme}) => theme.borderRadius[8]};
  background-color: ${({theme, backColor}) =>
    backColor && backColor !== 'transparent'
      ? theme.colors[backColor]
      : 'transparent'};
  ${({theme, tintColor}) =>
    tintColor && `tint-color: ${(theme.colors as any)[tintColor]};`}
  ${({theme, size}) =>
    `width: ${theme.iconsSizes[size || 'normal']}; height: ${
      theme.iconsSizes[size || 'normal']
    };`};
`;
