import styled from 'styled-components/native';
import {IProps} from './';

export const CustomImage = styled.Image.attrs(({theme, module, name}: IProps) => ({
  source: name && module && theme.images[module][name],
}))``;
