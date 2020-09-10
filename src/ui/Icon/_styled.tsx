import styled from 'styled-components/native';
import {IProps} from './';

export interface IStyledProps extends IProps {
  readonly theme: object;
}

export const Icon = styled.Image.attrs(({source, theme}: IStyledProps) => ({
  source: (theme.icons as any)[source],
}))`
  ${({theme, tintColor}) =>
    tintColor && `tint-color: ${(theme.colors as any)[tintColor]};`}
`;
