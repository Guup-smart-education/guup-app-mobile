import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {IProps} from './';

export const RowFullWidth = styled.View<IProps>`
  width: ${Dimensions.get('screen').width + 'px'};
  padding-left: ${({padding}) => `${padding || 0}px`};
  padding-right: ${({padding}) => `${padding || 0}px`};
  padding-bottom: 0;
  padding-top: 0;
  justify-content: ${({align}) => align};
  align-items: ${({align}) => align};
`;
