import React, {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {Maybe} from 'graphql/jsutils/Maybe';
import {
  CardContainer,
  CardSectionBody,
  CardActions,
  CardWrapper,
  CardSectionHeader,
  CardSectionTitle,
  CardTitle,
  CardShowMoreContainer,
} from './_styled';
import {Text, Icon, Separator, Action, Link} from './../../ui';
import Avatar from './../Avatar';
import Popover from './../Popover';
import MenuList from './../MenuList';
import {IMenuItemProps} from './../../@types/menu.item';
import {EModel, ECourse} from './../../@enum/course.model';
import {
  UserProfile,
  EnumContentType,
  useRemoveCourseMutation,
} from './../../graphql/types.d';

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
  model = 'PUBLIC',
  imageUri,
  title,
  description,
  onPress,
  owner,
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
  const [showCourseDescription, toggleCourseDescription] = useState(false);
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
    <CardContainer
      source={{
        uri:
          imageUri ||
          'https://media4.giphy.com/media/L2xmR6N2cX94M8iBcX/giphy.gif?cid=ecf05e47e734662ee2e2c424f003c2426d4028038bc1c6ff&rid=giphy.gif',
      }}
      onLoadStart={() => setImgLoading(true)}
      onLoadEnd={() => setImgLoading(false)}>
      <Action onPress={() => onPress && onPress()}>
        <CardWrapper>
          <CardActions>
            <Action onPress={() => setShowOptions(true)}>
              <Icon source="dots" tintColor="ligth" blur />
            </Action>
            <Separator size="lili" />
            <Action onPress={() => setShowOptions(true)}>
              <Icon source="claps" tintColor="ligth" blur />
            </Action>
            <Separator size="lili" />
            <Action onPress={() => setShowOptions(true)}>
              <Icon source="save" tintColor="ligth" blur />
            </Action>
          </CardActions>
          <CardSectionHeader>
            <CardSectionTitle>
              <CardTitle>
                <Separator size="lili" />
                <Text preset="subtitle" color="ligth" bold lineHeight={32}>
                  {title}
                </Text>
              </CardTitle>
            </CardSectionTitle>
          </CardSectionHeader>
          <CardSectionBody>
            {showCourseDescription && (
              <CardShowMoreContainer>
                <View>
                  <Text preset="comment" bold color="ligth">
                    {description}
                  </Text>
                  <Separator size="small" />
                </View>
              </CardShowMoreContainer>
            )}
            <Link
              color="contrast"
              onPress={() => toggleCourseDescription(!showCourseDescription)}>
              Máis detalhes
            </Link>
            <Separator size="small" />
            <Avatar
              ligth
              size="comment"
              firstText={owner?.displayName}
              secondText={owner?.profission}
              image={owner?.thumbnailURL}
            />
          </CardSectionBody>
        </CardWrapper>
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
