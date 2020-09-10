import styled from 'styled-components/native';

export const ActivityIndicator = styled.ActivityIndicator.attrs(({theme}) => ({
  color: theme.colors.primary,
  size: 'large',
}))``;
