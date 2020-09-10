import React from 'react';
import {Icon, Action} from './../ui';
import {PropsApp} from './../@types/app.navigation';

export const StackOption = {
  headerLeftContainerStyle: {paddingLeft: 25},
  headerRightContainerStyle: {paddingRight: 25},
  headerTransparent: false,
  headerLeft: () => <Icon source="profile" />,
  headerTitle: () => <Icon source="guup" />,
  headerRight: () => <Icon source="search" />,
  headerTitleAlign: 'center',
  headerStyle: {
    elevation: 0,
  },
};

export const StackBackOption = ({navigation: {goBack}}: PropsApp) => ({
  headerLeftContainerStyle: {paddingLeft: 25},
  headerRightContainerStyle: {paddingRight: 25},
  headerTransparent: false,
  headerLeft: () => (
    <Action onPress={() => goBack()}>
      <Icon source="arrow" />
    </Action>
  ),
  title: '',
  headerTitleAlign: 'center',
  headerStyle: {
    elevation: 0,
  },
});

export const StackBackOptionTransparent = ({
  navigation: {goBack},
}: PropsApp) => ({
  headerLeftContainerStyle: {paddingLeft: 25},
  headerRightContainerStyle: {paddingRight: 25},
  headerTransparent: true,
  headerLeft: () => (
    <Action onPress={() => goBack()}>
      <Icon source="arrow" />
    </Action>
  ),
  title: '',
  headerTitleAlign: 'center',
  headerStyle: {
    elevation: 0,
  },
});
