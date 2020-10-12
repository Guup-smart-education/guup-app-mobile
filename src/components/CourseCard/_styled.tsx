import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const CardContainer = styled.View`
  background-color: ${({theme}) => theme.colors.ligth};
  border-radius: ${({theme}) => theme.borderRadius[8]};
  margin-left: ${({theme}) => theme.spacing.margin[25]};
  margin-right: ${({theme}) => theme.spacing.margin[25]};
  overflow: hidden;
`;

export const CardSectionTop = styled.ImageBackground`
  height: ${Dimensions.get('screen').width - 120}px;
  background-color: ${({theme}) => theme.colors.ligth};
  width: 100%;
`;

export const CardSectionBody = styled.View`
  /* border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.ligthGrey}; */
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: ${({theme}) => theme.spacing.padding[20]};
  padding-top: ${({theme}) => theme.spacing.padding[20]};
  padding-left: ${({theme}) => theme.spacing.padding[20]};
  padding-right: ${({theme}) => theme.spacing.padding[20]};
`;

export const CardContent = styled.View`
  width: 70%;
`;

export const CardActions = styled.View``;
