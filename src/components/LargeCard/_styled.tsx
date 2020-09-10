import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const CardTouchArea = styled.View`
  flex: 1;
`;

export const CardContainer = styled.ImageBackground.attrs(({source}) => ({
  source,
}))`
  align-items: center;
  background-color: ${({theme}) => theme.colors.smoothGrey};
  border-radius: ${({theme}) => theme.borderRadius[12]};
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: ${({theme}) => theme.spacing.padding[25]};
  padding-top: ${({theme}) => theme.spacing.padding[20]};
  padding-left: ${({theme}) => theme.spacing.padding[20]};
  padding-right: ${({theme}) => theme.spacing.padding[20]};
  /* width: ${Dimensions.get('window').width - 50 + 'px'};
  height: ${Dimensions.get('window').width - 50 + 'px'}; */
  height: 100%;
  flex: 1;
  align-items: flex-start;
  resize-mode: stretch;
  overflow: hidden;
`;

export const CardSectionTop = styled.View`
  align-items: flex-end;
  flex: 1;
  justify-content: flex-start;
  width: 100%;
`;

export const CardSectionBottom = styled.View`
  align-items: flex-start;
  flex: 1;
  justify-content: flex-end;
  width: 70%;
`;
