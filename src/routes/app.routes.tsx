import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components';
import {Icon} from './../ui';
import {RootApp} from './../@types/app.navigation';
import {
  GuupExplorer,
  GuupNews,
  GuupCourses,
  GuupCourseDetail,
  GuupUserProfile,
  GuupComments,
  GuupClassRoom,
  GuupClassModule,
  GuupClassArticle,
  GuupClassVideo,
} from './../pages';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ETabIcon} from './../@enum/icons.enum';
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
        style: {
          borderTopColor: `${theme.colors.veryLigthGrey}`,
          borderTopWidth: 1.5,
          elevation: 0,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => (
          <Icon style={{tintColor: color}} source={ETabIcon[route.name]} />
        ),
      })}>
      <AppTabStack.Screen name="GuupNews" component={GuupNews} />
      <AppTabStack.Screen name="GuupExplorer" component={GuupExplorer} />
      <AppTabStack.Screen name="GuupCourse" component={GuupCourses} />
    </AppTabStack.Navigator>
  );
};

const AppRouter: React.FC = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        options={StackOption}
        name="GuupExplorer"
        component={HomeRouter}
      />
      <AppStack.Screen
        options={StackBackOption}
        name="GuupCourseDetail"
        component={GuupCourseDetail}
      />
      <AppStack.Screen
        options={StackBackOptionTransparent}
        name="GuupUserProfile"
        component={GuupUserProfile}
      />
      <AppStack.Screen
        options={StackBackOption}
        name="GuupComments"
        component={GuupComments}
        initialParams={{
          id: '',
        }}
      />
      <AppStack.Screen
        options={StackBackOption}
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
