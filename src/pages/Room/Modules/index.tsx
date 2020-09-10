import React from 'react';
import {View} from 'react-native';
import {Container, Action} from './../../../ui';
import {GetUniqueId} from './../../../helper';
import {Module} from './../../../components';
import {ICourseModule} from './../../../@types/course.cover';
import {PropsApp} from './../../../@types/app.navigation';

const MODULES: Array<ICourseModule> = [
  {
    moduleId: GetUniqueId(),
    moduleName: 'Intro to HTML',
    moduleDescription:
      'It begins! Get oriented, learn the basics of HTML, and write your first line of code!',
    moduleProgress: 20,
    moduleHours: 24,
    moduleContents: 12,
    moduleProjects: 2,
  },
  {
    moduleId: GetUniqueId(),
    moduleName: 'Intro to CSS',
    moduleDescription:
      'Add style to your HTML code with CSS (Cascading Style Sheets). Experiment with adjusting various style rules in CSS to make your website shine. Achieve the look and presentation you want for your own webpage.',
    moduleProgress: 20,
    moduleHours: 24,
    moduleContents: 12,
    moduleProjects: 2,
  },
];

export default ({navigation}: PropsApp) => {
  console.log('navigation', navigation);
  return (
    <Container>
      {MODULES.map((module) => (
        <Action
          key={module.moduleId}
          onPress={() =>
            navigation.navigate('GuupClassModule', {id: module.moduleId})
          }>
          <View style={{flex: 1, width: '100%'}}>
            <Module {...module} key={module.moduleId} showProgress />
          </View>
        </Action>
      ))}
    </Container>
  );
};
