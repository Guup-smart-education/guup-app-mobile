import styled from 'styled-components/native';

export const ActivityIndicator = styled.ActivityIndicator.attrs(
  ({theme, color}) => ({
    color: theme.colors[color],
  }),
)``;
