import React, {useState, useEffect} from 'react';
import {Alert, View, ActivityIndicator} from 'react-native';
import {Maybe} from 'graphql/jsutils/Maybe';
import {
  CardContainer,
  CardSectionBody,
  CardSectionTop,
  CardContent,
  CardActions,
  CardSectionHeader,
  CardSectionTitle,
  CardTitle,
} from './_styled';
import {Text, Icon, Separator, Action} from './../../ui';
import Avatar from './../Avatar';
import Popover from './../Popover';
import GuupDate from './../Date';
import MenuList from './../MenuList';
import ShowMore from './../ShowMore';
import {IMenuItemProps} from './../../@types/menu.item';
import {EModel, ECourse} from './../../@enum/course.model';
import {
  UserProfile,
  EnumContentType,
  useRemoveCourseMutation,
} from './../../graphql/types.d';
import {da} from 'date-fns/locale';
// import {EditCollectionScreenNavigationProp} from './../../@types/app.navigation';
// import {useNavigation} from '@react-navigation/native';

export interface Props {
  readonly id: string;
  readonly type: keyof typeof ECourse;
  readonly model?: keyof typeof EModel;
  readonly contentType?: keyof typeof EnumContentType;
  readonly imageUri?: string;
  readonly title?: string;
  readonly description?: string;
  readonly content?: string;
  readonly createdAt?: string | undefined | null;
  readonly owner?: UserProfile | undefined;
  readonly owners?: Maybe<UserProfile>[] | undefined | null;
  readonly onPress?: () => void;
}

const CourseCard: React.FC<Props> = ({
  type,
  model = 'PUBLIC',
  imageUri,
  title,
  description,
  content,
  onPress,
  owner,
  owners,
  createdAt,
  id,
}) => {
  // const {navigate} = useNavigation<EditCollectionScreenNavigationProp>();
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
  const [imgLoading, setImgLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [removeCourse, {data, loading, error}] = useRemoveCourseMutation();
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
        text: 'Sim',
        style: 'destructive',
        onPress: () =>
          removeCourse({
            variables: {
              course: id,
            },
          }),
      },
      {
        text: 'Nao',
      },
    ]);
  };
  // End handlers
  return (
    <CardContainer>
      <Action onPress={() => onPress && onPress()}>
        <View>
          <CardSectionHeader>
            <CardSectionTop
              source={{
                uri:
                  imageUri ||
                  'https://images.unsplash.com/photo-1604074131228-9d48b811bd80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
              }}
              onLoadStart={() => setImgLoading(true)}
              onLoadEnd={() => setImgLoading(false)}>
              {imgLoading && <ActivityIndicator />}
              <CardSectionTitle>
                <CardActions>
                  <Action onPress={() => setShowOptions(true)}>
                    <Icon source="dots" tintColor="ligth" size="small" blur />
                  </Action>
                </CardActions>
                <CardTitle>
                  {createdAt && <GuupDate date={createdAt} />}
                  <Separator size="lili" />
                  <Text preset="subtitle" color="ligth" bold>
                    {title}
                  </Text>
                </CardTitle>
              </CardSectionTitle>
            </CardSectionTop>
          </CardSectionHeader>
          <CardSectionBody>
            <CardContent>
              {content && (
                <Text preset="label" color="greyBrown">
                  {content}
                </Text>
              )}
              {description && (
                <ShowMore text={description} preset="comment" color="dark" />
              )}
              <Separator size="small" />
              <Avatar
                size="comment"
                firstText={owner?.displayName}
                secondText={owner?.profission}
                image={owner?.thumbnailURL}
              />
              {/* {type === 'COURSE' || !owners || owners.length === 1 ? (
                <Avatar
                  size="comment"
                  firstText={owner?.displayName}
                  secondText={owner?.profission}
                  image={owner?.thumbnailURL}
                />
              ) : (
                <GroupAvatar
                  avatars={owners.map((item) => `${item?.thumbnailURL}`)}
                />
              )} */}
              <Separator size="tiny" />
            </CardContent>
          </CardSectionBody>
        </View>
      </Action>
      <Popover
        visible={showOptions}
        height={50 + OPTIONS_ITEMS.length * 44}
        toggle={() => setShowOptions(false)}>
        <MenuList menuItems={OPTIONS_ITEMS} hideChevron compress noBorder />
      </Popover>
    </CardContainer>
  );
};

export default CourseCard;
