import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Text, Separator, Action, Icon} from './../../ui';
import {
  CourseContainer,
  CourseBody,
  CourseHeader,
  CourseFooter,
  CourseData,
  CourseFooterItem,
  CourseTitle,
  CourseAction,
} from './_styled';
import Popover from './../Popover';
import MenuList from './../MenuList';
import {IMenuItemProps} from './../../@types/menu.item';
import {Course, useRemoveCourseMutation} from './../../graphql/types.d';
import {EModel} from './../../@enum/course.model';

interface CourseProps extends Course {
  readonly model?: keyof typeof EModel;
}

export default ({
  id,
  title,
  description,
  clapsCount,
  commentsCount,
  viewsCount,
  model,
}: CourseProps) => {
  // Menu
  const OPTIONS_ITEMS: Array<IMenuItemProps> =
    model === 'OWNER'
      ? [
          {
            text: 'Remover conteudo',
            onPress: () => remove(),
            icon: 'trash',
          },
          {
            text: 'Editar conteudo',
            onPress: () => Alert.alert('Ver!!', 'Ver mais tarde'),
            icon: 'settings',
          },
        ]
      : [
          {
            text: 'Ver mais tarde',
            onPress: () => Alert.alert('Ver!!', 'Ver mais tarde'),
            icon: 'save',
          },
          {
            text: 'Me avise de novo conteudo',
            onPress: () => Alert.alert('Ver!!', 'Ver mais tarde'),
            icon: 'bell',
          },
          {
            text: 'Reportar conteudo',
            onPress: () => Alert.alert('Report!!', 'Reportar'),
            icon: 'alert',
          },
        ];
  const [showOptions, setShowOptions] = useState(false);
  const [removeCourse, {loading, data, error}] = useRemoveCourseMutation();
  // Effects
  useEffect(() => {
    if (data?.removeCourse?.__typename === 'RemoveCourse') {
      Alert.alert(
        'Cursos removido',
        data.removeCourse.success?.message || 'Curso removido com sucesso',
      );
    } else if (data?.removeCourse?.__typename === 'ErrorResponse') {
      Alert.alert(
        'Aconteceu um error',
        data.removeCourse.error.message ||
          'Tente novamente ou entre em contato com a gente',
      );
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      Alert.alert(
        'Aconteceu um error',
        error.message || 'Ooops! entre em contato  a gente',
      );
    }
  }, [error]);
  // End effects
  // Handlers
  const remove = () => {
    Alert.alert('Cuidado!!', 'Voce realmente deseja eliminar este conteudo?', [
      {
        text: loading ? 'Sim' : 'Espere',
        style: 'destructive',
        onPress: () => {
          setShowOptions(false);
          removeCourse({
            variables: {
              course: `${id}`,
            },
          });
        },
      },
      {
        text: 'Nao',
      },
    ]);
  };
  // End handlers
  return (
    <>
      <CourseContainer>
        <CourseHeader>
          <CourseTitle>
            <Text preset="paragraph" bold>
              {title}
            </Text>
          </CourseTitle>
          <CourseAction>
            <Action onPress={() => setShowOptions(true)}>
              <Icon source="dots" blur tintColor="darkGrey" />
            </Action>
          </CourseAction>
        </CourseHeader>
        <CourseBody>
          <CourseData>
            <Text preset="comment" color="dark">
              {description}
            </Text>
          </CourseData>
        </CourseBody>
        <CourseFooter>
          <CourseFooterItem>
            <Icon source="heart" />
            <Text preset="comment" bold>
              {viewsCount || '0'}
            </Text>
          </CourseFooterItem>
          <CourseFooterItem>
            <Icon source="forum" />
            <Text preset="comment" bold>
              {commentsCount || '0'}
            </Text>
          </CourseFooterItem>
          <CourseFooterItem>
            <Icon source="claps" />
            <Text preset="comment" bold>
              {clapsCount || '0'}
            </Text>
          </CourseFooterItem>
        </CourseFooter>
      </CourseContainer>
      <Popover
        visible={showOptions}
        height={50 + OPTIONS_ITEMS.length * 44}
        toggle={() => setShowOptions(false)}>
        <MenuList
          menuItems={OPTIONS_ITEMS || []}
          hideChevron
          compress
          noBorder
        />
      </Popover>
    </>
  );
};
