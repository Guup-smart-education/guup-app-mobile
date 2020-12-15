import styled, {DefaultTheme} from 'styled-components/native';
import {IProps} from './';

interface ICustomImage extends IProps {
  readonly theme: DefaultTheme;
}

export const CustomImage = styled.Image.attrs(
  ({theme, module = 'onboarding', name = 'welcome'}: ICustomImage) => ({
    source: theme.images[module][name],
  }),
)``;
