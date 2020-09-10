import 'react-native-gesture-handler';
import {ThemeProvider} from 'styled-components/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {AuthProvider} from './contexts/auth';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';
import {guupTheme} from './theme/guup.theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={guupTheme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
