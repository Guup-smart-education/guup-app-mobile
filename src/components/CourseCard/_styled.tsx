import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const CardContainer = styled.View`
  background-color: ${({theme}) => theme.colors.ligth};
  /* border-radius: ${({theme}) => theme.borderRadius[8]}; */
  /* margin-left: ${({theme}) => theme.spacing.margin[25]};
  margin-right: ${({theme}) => theme.spacing.margin[25]}; */
  /* overflow: hidden; */
  width: 100%;
`;

export const CardSectionTop = styled.ImageBackground`
  height: ${Dimensions.get('screen').width * 1.2}px;
  background-color: ${({theme}) => theme.colors.ligthGrey};
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const CardSectionHeader = styled.View`
  width: 100%;
`;

export const CardSectionTitle = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  padding-bottom: ${({theme}) => theme.spacing.padding[20]};
  padding-top: ${({theme}) => theme.spacing.padding[20]};
`;

export const CardTitle = styled.View`
  width: 80%;
`;

export const CardSectionBody = styled.View`
  /* background-color: aliceblue; */
  /* flex-direction: column; */
  /* flex: 1; */
  justify-content: space-between;
  padding-bottom: ${({theme}) => theme.spacing.padding[20]};
  padding-top: ${({theme}) => theme.spacing.padding[15]};
  padding-left: ${({theme}) => theme.spacing.padding[25]};
  padding-right: ${({theme}) => theme.spacing.padding[25]};
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.ligthGrey};
`;

export const CardContent = styled.View`
  padding-right: ${({theme}) => theme.spacing.padding[20]};
`;

export const CardActions = styled.View`
  align-items: flex-end;
`;

export const CardBottomActions = styled.View`
  flex-direction: row;
  align-items: center;
`;
