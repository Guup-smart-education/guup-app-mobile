import R from 'ramda';
import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components';
import {Icon} from './../ui';
import {RootApp} from './../@types/app.navigation';
import {
  GuupExplorer,
  GuupNews,
  GuupCourses,
  GuupCollectionDetail,
  GuupCollectionCreate,
  GuupContentCreate,
  GuupUserProfile,
  GuupComments,
  GuupClassRoom,
  GuupClassModule,
  GuupClassArticle,
  GuupClassVideo,
  GuupAccount,
  GuupCollections,
  GuupPosts,
  GuupNotifications,
  GuupSettings,
  GuupEditCollections,
  GuupPostCreate,
} from './../pages';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {EIcons, ETabIcon} from './../@enum/icons.enum';
import {
  StackBackOption,
  StackBackOptionTransparent,
  StackOption,
} from './stack.options';

const AppTabStack = createBottomTabNavigator<RootApp>();
const AppStack = createStackNavigator<RootApp>();

const HomeRouter: React.FC = () => {
  const theme = useContext(ThemeContext);
  return (
    <AppTabStack.Navigator
      initialRouteName="GuupExplorer"
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.dark,
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
          // backgroundColor: 'transparent',
          backgroundColor: `${theme.colors.ligth}`,
          // position: 'absolute',
          borderTopColor: `${theme.colors.ligthGrey}`,
          // elevation: 0,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused}) => (
          <Icon
            source={R.cond([
              [
                R.equals('GuupExplorer'),
                () =>
                  focused ? ETabIcon.GuupExplorerFocus : ETabIcon.GuupExplorer,
              ],
              [
                R.equals('GuupNews'),
                () => (focused ? ETabIcon.GuupNewsFocus : ETabIcon.GuupNews),
              ],
              [
                R.T,
                () =>
                  focused ? ETabIcon.GuupAccountFocus : ETabIcon.GuupAccount,
              ],
            ])(`${route.name}`)}
          />
        ),
      })}>
      <AppTabStack.Screen name="GuupNews" component={GuupNews} />
      <AppTabStack.Screen name="GuupExplorer" component={GuupExplorer} />
      <AppTabStack.Screen name="GuupAccount" component={GuupAccount} />
    </AppTabStack.Navigator>
  );
};

const AppRouter: React.FC = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupExplorer"
        component={HomeRouter}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupCollectionDetail"
        component={GuupCollectionDetail}
        initialParams={{
          mode: 'ONLY_VIEW',
        }}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupCollectionCreate"
        component={GuupCollectionCreate}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupContentCreate"
        component={GuupContentCreate}
        initialParams={{
          path: undefined,
        }}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupUserProfile"
        component={GuupUserProfile}
        initialParams={{
          type: 'PUBLIC',
          id: '',
        }}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupAccount"
        component={GuupAccount}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupCollections"
        component={GuupCollections}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupEditCollection"
        component={GuupEditCollections}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupCourses"
        component={GuupCourses}
        initialParams={{
          owner: '',
          type: 'PUBLIC',
        }}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupPosts"
        component={GuupPosts}
        initialParams={{
          owner: '',
          type: 'PUBLIC',
        }}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupPostCreate"
        component={GuupPostCreate}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupNotifications"
        component={GuupNotifications}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupSettings"
        component={GuupSettings}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupComments"
        component={GuupComments}
      />
      <AppStack.Screen
        options={{header: () => null}}
        name="GuupClassRoom"
        component={GuupClassRoom}
        initialParams={{
          id: '',
        }}
      />
      <AppStack.Screen
        options={StackBackOption}
        name="GuupClassModule"
        component={GuupClassModule}
        initialParams={{
          id: '',
        }}
      />
      <AppStack.Screen
        options={StackBackOptionTransparent}
        name="GuupClassVideo"
        component={GuupClassVideo}
        initialParams={{
          id: '',
        }}
      />
      <AppStack.Screen
        options={StackBackOptionTransparent}
        name="GuupClassArticle"
        component={GuupClassArticle}
        initialParams={{
          id: '',
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppRouter;
