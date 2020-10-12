import React from 'react';
import {Icon, Action, Text} from './../ui';
import {PropsApp} from './../@types/app.navigation';
import {StackNavigationOptions} from '@react-navigation/stack';

export const StackOption = ({
  navigation,
}: PropsApp): StackNavigationOptions => ({
  headerLeftContainerStyle: {paddingLeft: 25},
  headerRightContainerStyle: {paddingRight: 25},
  headerTransparent: false,
  headerLeft: () => <Icon source="guup" />,
  headerTitle: () => null,
  headerRight: () => (
    <Action onPress={navigation.navigate('GuupNews')}>
      <Text preset="comment" bold underline>
        criar conteudo +
      </Text>
    </Action>
  ),
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#F6F6F6',
    elevation: 0,
    paddingBottom: 5,
  },
  header: () => null,
});

export const StackBackOption = ({
  navigation: {goBack},
}: PropsApp): StackNavigationOptions => ({
  headerLeftContainerStyle: {paddingLeft: 25},
  headerRightContainerStyle: {paddingRight: 25},
  headerTransparent: false,
  headerLeft: () => (
    <Action onPress={goBack()}>
      <Icon source="arrow" />
    </Action>
  ),
  title: '',
  headerTitleAlign: 'center',
  headerStyle: {
    elevation: 0,
  },
  header: () => null,
});

export const StackBackOptionTransparent = ({
  navigation: {goBack},
}: PropsApp): StackNavigationOptions => ({
  headerLeftContainerStyle: {paddingLeft: 25},
  headerRightContainerStyle: {paddingRight: 25},
  headerTransparent: true,
  headerLeft: () => (
    <Action onPress={goBack()}>
      <Icon source="arrow" />
    </Action>
  ),
  title: '',
  headerTitleAlign: 'center',
  headerStyle: {
    elevation: 0,
  },
  header: () => null,
});
