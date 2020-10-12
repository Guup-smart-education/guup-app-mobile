import 'react-native-gesture-handler';
import {ThemeProvider} from 'styled-components/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {AuthProvider} from './contexts/auth';
import {PathProvider} from './contexts/path';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';
import {guupTheme} from './theme/guup.theme';
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo/config';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={guupTheme}>
      <ApolloProvider {...{client}}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AuthProvider>
              <PathProvider>
                <Routes />
              </PathProvider>
            </AuthProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
