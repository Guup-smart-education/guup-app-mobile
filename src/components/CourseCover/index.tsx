import React from 'react';
import IconList from './../IconList';
import {Text, Icon, Separator, Link} from './../../ui';
import {IconsList as IconListType} from './../../@types/icons.list';
import {ICourseCover} from './../../@types/course.cover';

import {
  CourseCoverContainer,
  CourseCoverHeader,
  CourseCoverBody,
  CourseCoverFooter,
} from './_styled';

const createList: (
  projectsCompleted: number,
  modulesCompleted: number,
  totalModules: number,
  courseNotification: number,
  hoursSpended: number,
) => Array<IconListType> = (
  projectsCompleted,
  modulesCompleted,
  totalModules,
  courseNotification,
  hoursSpended,
) => {
  return [
    {
      icon: 'project',
      text: `${projectsCompleted} Projetos concluidos`,
    },
    {
      icon: 'module',
      text: `${modulesCompleted} - ${totalModules} modulos finalizados`,
    },
    {
      icon: 'forum',
      text: `${courseNotification} Notificacoes`,
    },
    {
      icon: 'clock',
      text: `${hoursSpended} horas estudadas`,
    },
  ];
};

interface ICourse extends ICourseCover {
  readonly onPress: () => void;
}

export default ({
  courseId,
  percentCompleted,
  courseArea,
  courseName,
  projectsCompleted,
  modulesCompleted,
  totalModules,
  courseNotification,
  hoursSpended,
  onPress,
}: ICourse) => {
  return (
    <CourseCoverContainer testID={courseId}>
      <CourseCoverHeader>
        <Text preset="title" color="primary">{`${percentCompleted}%`}</Text>
        <Icon source="dots" />
      </CourseCoverHeader>
      <Separator size="lili" />
      <CourseCoverBody>
        <Text preset="label" light>
          {courseArea}
        </Text>
        <Separator size="lili" />
        <Text preset="chat" bold>
          {courseName}
        </Text>
        <Separator size="medium" />
        <IconList
          list={createList(
            projectsCompleted,
            modulesCompleted,
            totalModules,
            courseNotification,
            hoursSpended,
          )}
        />
      </CourseCoverBody>
      <Separator size="medium" />
      <CourseCoverFooter>
        <Link preset="solid" onPress={onPress}>
          {hoursSpended > 0 ? 'Continuar' : 'Iniciar curso'}
        </Link>
      </CourseCoverFooter>
    </CourseCoverContainer>
  );
};
