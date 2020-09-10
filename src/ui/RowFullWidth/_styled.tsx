import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

type Props = {
  readonly padding?: number;
};

export const RowFullWidth = styled.View<Props>`
  width: ${Dimensions.get('screen').width + 'px'};
  padding-left: ${({padding}) => `${padding || 0}px`};
  padding-right: ${({padding}) => `${padding || 0}px`};
  padding-bottom: 0;
  padding-top: 0;
`;
