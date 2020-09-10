import styled from 'styled-components/native';

export const KeyboardContainer = styled.KeyboardAvoidingView`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  flex: 1;
  background-color: ${({theme}) => theme.colors.ligth};
`;

export const KeyboardDismiss = styled.TouchableWithoutFeedback``;

export const KeyboardBlock = styled.View`
  width: 100%;
  justify-content: space-between;
  flex: 1;
`;
