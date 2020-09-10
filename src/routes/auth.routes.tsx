import React from 'react';
import {SignIn, SignUp, Onboarding, Waiting} from './../pages';
import {RootAuth, EAuth} from './../@types/auth.navigation';
import {createStackNavigator} from '@react-navigation/stack';
import {Link, CustomImage} from './../ui';

const AuthStack = createStackNavigator<RootAuth>();

const NoHeaderOptions = {
  headerShown: false,
};

const AuthRouter: React.FC = () => {
  return (
    <AuthStack.Navigator
      // mode="modal"
      initialRouteName="AuthOnboarding"
      screenOptions={{
        headerLeftContainerStyle: {paddingLeft: 25},
        headerRightContainerStyle: {paddingRight: 25},
        headerTransparent: false,
      }}>
      <AuthStack.Screen
        options={({navigation}) => {
          return {
            headerLeft: () => <CustomImage module="logo" name="large" />,
            headerTitle: () => null,
            headerRight: () => null,
            // headerRight: () => (
            //   <Link onPress={() => navigation.navigate(EAuth.AuthSignIn)}>
            //     Ja tenho conta
            //   </Link>
            // ),
          };
        }}
        name="AuthOnboarding"
        component={Onboarding}
      />
      <AuthStack.Screen
        options={NoHeaderOptions}
        name="AuthSignIn"
        component={SignIn}
      />
      <AuthStack.Screen
        options={NoHeaderOptions}
        name="AuthSignUp"
        component={SignUp}
      />
      <AuthStack.Screen
        options={NoHeaderOptions}
        name="AuthWaiting"
        component={Waiting}
        initialParams={{
          title: 'Só um segundo',
          description:
            'Aguarde um momento enquanto trabalhamos para te dar a melhor experiencia',
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRouter;
