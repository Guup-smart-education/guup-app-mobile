import React from 'react';
import {Container, Text, Separator, RowFullWidth} from './../../ui';
import ActivityIndicator from './../../ui/ActivityIndicator';

interface ILoading {
  readonly message?: string;
}

const LoadingScreen: React.FC<ILoading> = ({message = 'Loading..'}) => {
  return (
    <Container safe center>
      <ActivityIndicator />
      <Separator size="medium" />
      <Text preset="comment" bold center>
        {message}
      </Text>
    </Container>
  );
};

export default LoadingScreen;
