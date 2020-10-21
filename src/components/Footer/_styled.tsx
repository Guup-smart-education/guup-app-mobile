import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {IFooter} from './';

export const FooterContainer = styled.View<IFooter>`
  width: 100%;
  background-color: ${({theme, color}) => theme.colors[color || 'dark']};
  min-height: ${Dimensions.get('screen').width / 5 + 'px'};
  padding-top: ${({theme}) => theme.spacing.padding[15]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
`;
