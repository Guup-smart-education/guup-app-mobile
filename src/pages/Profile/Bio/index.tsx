import React from 'react';
import {View} from 'react-native';
import {CourseTabContent} from '../_styled';
import {Gain} from '../../../components';
import {Text, Separator} from './../../../ui';
import {GetUniqueId} from '../../../helper';
import {GainProps} from '../../../@types/gain.content';

const GAINS: Array<GainProps> = [
  {
    gainIcon: 'project',
    gainTitle: 'Experience',
    gainDescription:
      '14 anos de experiencia na area de desenvolvimento e desenho de aplicativos mobile em Google',
  },
];

export default () => {
  return (
    <CourseTabContent>
      <Text preset="button">Presentation</Text>
      <Separator size="tiny" />
      <Text preset="comment">
        I am a Front End developer with industry experience building websites
        and web applications. I specialize in JavaScript and have professional
        experience working with C# and Angular.
      </Text>
      <Separator size="large" />
      {GAINS.map((gain) => (
        <View key={GetUniqueId()}>
          <Gain {...gain} />
          <Separator size="large" />
        </View>
      ))}
    </CourseTabContent>
  );
};
