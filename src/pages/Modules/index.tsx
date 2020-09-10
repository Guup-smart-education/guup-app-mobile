import React from 'react';
import {View} from 'react-native';
import {Text, Separator, Action} from './../../ui';
import {GetUniqueId} from './../../helper';
import {ModuleLesson} from './../../components';
import {ILessonGroup} from './../../@types/lesson.data';
import {PropsApp} from './../../@types/app.navigation';
import {
  ModuleRoomContainer,
  ModuleRoomData,
  ModuleRoomTitle,
  ModuleRoomHeader,
  ModuleRoomInfo,
  ModuleRoomBody,
  ModuleRoomContent,
  ModuleLessonGroup,
  ModuleLessonTitle,
} from './_styled';

const LESSONS: Array<ILessonGroup> = [
  {
    id: `lesson-group-${GetUniqueId()}`,
    title: 'Lesson 01',
    lessons: [
      {
        id: GetUniqueId(),
        type: 'video',
        title:
          'Understanding on how to set up for the program on your personal device',
        duration: 20,
        progress: 42,
      },
      {
        id: GetUniqueId(),
        type: 'video',
        title: 'Introduction to the “Programmer Mindset”.',
        duration: 8,
        progress: 12,
      },
      {
        id: GetUniqueId(),
        type: 'article',
        title:
          'Successfully writing and rendering your first lines of HTML code with a text editor and browser',
        duration: 12,
        progress: 0,
      },
      {
        id: GetUniqueId(),
        type: 'video',
        title: 'Introduction to the “Programmer Mindset”.',
        duration: 8,
        progress: 0,
      },
    ],
  },
  {
    id: `lesson-group-${GetUniqueId()}`,
    title: 'Lesson 02',
    lessons: [
      {
        id: GetUniqueId(),
        type: 'video',
        title:
          'Understanding on how to set up for the program on your personal device',
        duration: 20,
        progress: 0,
      },
      {
        id: GetUniqueId(),
        type: 'video',
        title: 'Introduction to the “Programmer Mindset”.',
        duration: 8,
        progress: 0,
      },
      {
        id: GetUniqueId(),
        type: 'article',
        title:
          'Successfully writing and rendering your first lines of HTML code with a text editor and browser',
        duration: 12,
        progress: 0,
      },
      {
        id: GetUniqueId(),
        type: 'video',
        title: 'Introduction to the “Programmer Mindset”.',
        duration: 8,
        progress: 0,
      },
    ],
  },
];

export default ({navigation}: PropsApp) => {
  console.log('params params = ', navigation);
  return (
    <ModuleRoomContainer showsVerticalScrollIndicator={false}>
      <ModuleRoomData>
        <ModuleRoomHeader>
          <ModuleRoomTitle>
            <Text preset="label" color="darkGrey">Development & TI</Text>
            <Separator size="lili" />
            <Text preset="subtitle">Intro to HTML</Text>
          </ModuleRoomTitle>
          <ModuleRoomInfo>
            <Text preset="title" bold color="primary">0%</Text>
            <Separator size="lili" />
          </ModuleRoomInfo>
        </ModuleRoomHeader>
        <Separator size="small" />
        <ModuleRoomBody>
          <Text lineHeight={28}>
            For this section, you will submit your very first programming file
            containing HTML code. HTML is the coding language for building
            websites. We recommend taking notes from this section and using your
            notes as the content for your HTML file. This project is a lab that
            is auto-graded in the classroom.
          </Text>
        </ModuleRoomBody>
      </ModuleRoomData>
      <ModuleRoomContent>
        {LESSONS.map((group) => {
          return (
            <ModuleLessonGroup key={group.id}>
              <ModuleLessonTitle>
                <Text preset="tall" bold color="primary" underline>
                  {group.title}
                </Text>
              </ModuleLessonTitle>
              {group.lessons.map((lesson) => {
                return (
                  <Action onPress={() => navigation.navigate('GuupClassVideo')}>
                    <View>
                      <ModuleLesson key={lesson.id} {...lesson} />
                    </View>
                  </Action>
                );
              })}
            </ModuleLessonGroup>
          );
        })}
      </ModuleRoomContent>
    </ModuleRoomContainer>
  );
};
