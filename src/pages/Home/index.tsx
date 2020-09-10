import React, {useContext} from 'react';
import {Text, Button} from 'react-native';
import {Container} from './../../ui';
import AuthContext from './../../contexts/auth';

const HomeScreen: React.FC = () => {
  const {signOut} = useContext(AuthContext);
  return (
    <Container>
      <Text>Home Screen</Text>
      <Button onPress={signOut} title="Sign out" />
    </Container>
  );
};

export default HomeScreen;
