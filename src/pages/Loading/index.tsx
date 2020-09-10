import React from 'react';
import {Text} from 'react-native';
import Container from './../../ui/Container';
import ActivityIndicator from './../../ui/ActivityIndicator';

const LoadingScreen: React.FC = () => {
  return (
    <Container>
      <ActivityIndicator />
      <Text>Loading..</Text>
    </Container>
  );
};

export default LoadingScreen;
