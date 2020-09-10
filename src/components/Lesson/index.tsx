import React from 'react';
import {View} from 'react-native';
import {Text, Icon, Dot} from './../../ui';
import {ILesson} from './../../@types/lesson.data';
import {ELessonType} from './../../@enum/lesson.type';
import {
  LessonContainer,
  LessonType,
  LessonContent,
  LessonDescription,
  LessonInfo,
  LessonProgressBackground,
  LessonProgress,
} from './_styled';

export default ({
  id,
  type = ELessonType.video,
  title,
  duration,
  progress,
}: ILesson) => {
  return (
    <LessonContainer key={`lesson-${id}`}>
      <LessonProgressBackground style={{width: `${progress || 0}%`}} />
      <LessonType>
        <Icon source={type} />
      </LessonType>
      <LessonContent style={{paddingBottom: !progress ? 25 : 35}}>
        <LessonDescription>
          <Text preset="comment">{title || 'Some description'}</Text>
        </LessonDescription>
        <LessonInfo>
          <Text bold>{duration || 0} min</Text>
          <Dot />
          <Text bold>{progress || 0}% completado</Text>
        </LessonInfo>
      </LessonContent>
      <LessonProgress style={{width: `${progress || 0}%`}} />
    </LessonContainer>
  );
};
