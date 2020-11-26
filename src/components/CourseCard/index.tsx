import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {Maybe} from 'graphql/jsutils/Maybe';
import {
  CardContainer,
  CardSectionBody,
  CardActions,
  CardWrapper,
  CardSectionHeader,
  CardSectionTitle,
  CardOverlay,
} from './_styled';
import {Text, Icon, Separator, Action} from './../../ui';
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
    <CardContainer>
      <Action onPress={() => onPress && onPress()}>
        <CardWrapper>
          <CardSectionHeader
            onLoadStart={() => setImgLoading(true)}
            onLoadEnd={() => setImgLoading(false)}
            source={{
              uri:
                imageUri ||
                'https://media4.giphy.com/media/L2xmR6N2cX94M8iBcX/giphy.gif?cid=ecf05e47e734662ee2e2c424f003c2426d4028038bc1c6ff&rid=giphy.gif',
            }}>
            <CardActions>
              <Action onPress={() => setShowOptions(true)}>
                <Icon source="dots" tintColor="ligth" blur />
              </Action>
            </CardActions>
            <CardSectionTitle>
              <Text preset="subtitle" color="ligth" bold>
                {title}
              </Text>
              <Separator size="tiny" />
              {/* <Link
                color="contrast"
                onPress={() => toggleCourseDescription(!showCourseDescription)}>
                {showCourseDescription ? 'Ver menos' : 'Ver mais'}
              </Link> */}
            </CardSectionTitle>
            <CardOverlay />
          </CardSectionHeader>
          {/* {showCourseDescription && (
            <CardDescription>
              <CardShowMoreContainer>
                <View>
                  <Text preset="paragraph" color="dark">
                    {description}
                  </Text>
                </View>
              </CardShowMoreContainer>
            </CardDescription>
          )} */}
          <CardSectionBody>
            <Avatar
              size="comment"
              firstText={owner?.displayName}
              secondText={owner?.profission}
              image={owner?.thumbnailURL}
            />
            <Action onPress={() => Alert.alert('Clap!!', 'Clap this course')}>
              <Icon source="claps" />
            </Action>
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
