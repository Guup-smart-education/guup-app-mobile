import styled from 'styled-components/native';
import {EDotsPosition} from './';

interface IContainer {
  horizontalPadding: boolean;
}

interface IFooterConfig {
  dotsPosition: keyof typeof EDotsPosition;
}

interface IDotProps {
  active: boolean;
}

export const CarouselContainer = styled.ScrollView<IContainer>`
  width: 100%;
  margin-bottom: 12px;
  ${({horizontalPadding, theme}) =>
    horizontalPadding &&
    `
    padding-left: ${theme.spacing.padding[30]};
    padding-right: ${theme.spacing.padding[30]};
  `}
`;

export const CarouselFooter = styled.View<IFooterConfig>`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({theme}) => theme.spacing.margin[25]};
  padding-left: ${({theme}) => theme.spacing.padding[30]};
  padding-right: ${({theme}) => theme.spacing.padding[30]};
  width: 100%;
`;

export const CarouselDotsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CarouselDot = styled.View<IDotProps>`
  height: 7px;
  /* width: 6px; */
  width: ${({active}) => `${active ? 18 : 6}px`};
  border-radius: 4px;
  background-color: ${({active, theme}) =>
    active ? theme.colors.dark : theme.colors.smoothGrey};
  margin-left: ${({active}) => `${active ? 6 : 4}px`};
  margin-right: ${({active}) => `${active ? 6 : 4}px`};
  ${({active}) => `transform: scale(${active ? 1.4 : 1})`};
`;
