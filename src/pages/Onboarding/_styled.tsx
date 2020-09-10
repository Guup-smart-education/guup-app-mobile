import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const OnboardingContainer = styled.View`
  flex-grow: 1;
  justify-content: flex-end;
  padding-top: ${({theme}) => theme.spacing.padding[15]};
  padding-bottom: ${({theme}) => theme.spacing.padding[15]};
`;

export const SliderImageContainer = styled.View`
  flex-grow: 2;
  justify-content: center;
  align-items: center;
`;

export const SliderContent = styled.View`
  flex-grow: 1;
  height: ${Dimensions.get('window').height * 0.3}px;
`;

export const OnboardingSliderBlock = styled.View`
  flex: 1;
  padding-left: ${({theme}) => theme.spacing.padding[30]};
  padding-right: ${({theme}) => theme.spacing.padding[30]};
  width: ${Dimensions.get('screen').width + 'px'};
`;

export const OnboardingFooter = styled.View`
  align-items: flex-end;
  background-color: ${({theme}) => theme.colors.primary};
  padding-top: ${({theme}) => theme.spacing.padding[25]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.margin[40]};
  width: 100%;
`;
