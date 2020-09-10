import React from 'react';
import {CourseTabContent} from './../_styled';
import {Action, Separator} from './../../../ui';
import {Course} from './../../../components';
import {CourseProps} from './../../../@types/course.content';
import {Alert, View} from 'react-native';
import {GetUniqueId} from '../../../helper';

const COURSE: Array<CourseProps> = [
  {
    id: GetUniqueId(),
    largeName: 'Course large name her',
    contentHours: '00 hours of content',
    priceValue: 'R$ 149.00',
  },
  {
    id: GetUniqueId(),
    largeName: 'Course large name her',
    contentHours: '00 hours of content',
    priceValue: 'R$ 149.00',
  },
  {
    id: GetUniqueId(),
    largeName: 'Course large name her',
    contentHours: '00 hours of content',
    priceValue: 'R$ 149.00',
  },
];

export default () => {
  return (
    <CourseTabContent>
      {COURSE.map((course) => (
        <View key={course.id}>
          <Action onPress={() => Alert.alert(course.largeName)}>
            <Course {...course} />
          </Action>
          <Separator size="small" />
        </View>
      ))}
    </CourseTabContent>
  );
};
