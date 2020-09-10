import React from 'react';
import {Text, Separator, Link} from './../../../ui';
import {DotList} from './../../../components';
import {CourseTabContent} from './../_styled';

export default () => {
  return (
    <CourseTabContent>
      <Text preset="chat">General Requirements</Text>
      <Separator size="small" />
      <DotList
        list={[
          {
            text:
              'You are self-driven and motivated to learn. Participation in this program requires consistently meeting project deadlines and devoting at least 10 hours per week to your work.',
          },
          {
            text:
              'You can communicate fluently and professionally in written and spoken English.',
          },
        ]}
      />
    </CourseTabContent>
  );
};
