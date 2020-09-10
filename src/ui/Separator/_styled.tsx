import styled from 'styled-components/native';
import {ESize, IProps} from './';

export const Separator = styled.View<IProps>`
  width: 100%;
  height: ${({size, theme}) => {
    switch (size) {
      case ESize.lili:
        return theme.spacing[5];
      case ESize.tiny:
        return theme.spacing[15];
      case ESize.small:
        return theme.spacing[20];
      case ESize.medium:
        return theme.spacing[25];
      case ESize.large:
        return theme.spacing[30];
      case ESize.extraLarge:
        return theme.spacing[40];
      default:
        return theme.spacing[50];
    }
  }};
`;
