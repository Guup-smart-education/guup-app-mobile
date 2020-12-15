import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Maybe} from 'graphql/jsutils/Maybe';
import {
  CardContainer,
  CardActions,
  CardWrapper,
  CardSectionHeader,
  CardSectionTitle,
  CardOverlay,
  CardOwner,
  CardLoading,
} from './_styled';
import {Text, Icon, Separator, Action, ActivityIndicator} from './../../ui';
import Avatar from './../Avatar';
import Popover from './../Popover';
import MenuList from './../MenuList';
import {IMenuItemProps} from './../../@types/menu.item';
import {ECourse} from './../../@enum/course.model';
import {EModel} from './../../@enum/model.type';
import {
  UserProfile,
  EnumContentType,
  useRemoveCourseMutation,
  MediaState,
} from './../../graphql/types.d';
import FastImage from 'react-native-fast-image';

export interface Props {
  readonly id: string;
  readonly assetId: string;
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
  readonly onRemove: (id: string) => void;
  readonly onClap: (id: string) => void;
  readonly status?: string;
  readonly clapped?: boolean;
}

const CourseCard: React.FC<Props> = ({
  model = 'PUBLIC',
  imageUri,
  title,
  onPress,
  owner,
  id,
  onClap,
  onRemove,
  status = MediaState.Preparing,
  clapped = false,
}) => {
  const [isClapped, setIsClapped] = useState<boolean>(clapped);
  const OPTIONS_ITEMS: Array<IMenuItemProps> =
    model === 'OWNER'
      ? [
          {
            text: 'Remover conteudo',
            onPress: () => remove(),
            icon: 'trash',
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
  const clap = () => {
    setIsClapped(!isClapped);
    onClap(id);
  };
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
          })
            .then(() => {
              console.log('removeCourse');
              onRemove(id);
              setShowOptions(false);
            })
            .catch((e) => {
              console.log('error', e);
              Alert.alert('Aconteceu um error 🛑', `Error: ${e.message}`);
            }),
      },
      {
        text: 'Nao',
      },
    ]);
  };
  // End handlers
  if (status === MediaState.Preparing) {
    return null;
    // TODO: Criar a logica de conteudo em preparacao
    // return (
    //   <CardPreparing>
    //     <CardPreparingInfo>
    //       <Text preset="paragraph" bold>
    //         {title}
    //       </Text>
    //       <Text preset="comment" color="darkGrey">
    //         Preparando conteudo...
    //       </Text>
    //     </CardPreparingInfo>
    //     <CardPreparingLoading>
    //       <ActivityIndicator color="primary" size="small" />
    //     </CardPreparingLoading>
    //   </CardPreparing>
    // );
  }
  return (
    <CardContainer>
      <Action onPress={() => onPress && onPress()}>
        <CardWrapper>
          <FastImage
            style={StyleSheet.absoluteFill}
            source={{
              priority: FastImage.priority.high,
              uri: imageUri,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onLoadStart={() => setImgLoading(true)}
            onLoadEnd={() => setImgLoading(false)}
          />
          <CardSectionHeader>
            {imgLoading || loading ? (
              <CardLoading>
                <ActivityIndicator color="dark" size="small" />
              </CardLoading>
            ) : (
              <>
                <CardActions>
                  <Action onPress={() => setShowOptions(true)}>
                    <Icon source="dots" tintColor="ligth" blur size="small" />
                  </Action>
                </CardActions>
                <CardSectionTitle>
                  <Text preset="subtitle" color="ligth" bold>
                    {title}
                  </Text>
                  <Separator size="tiny" />
                </CardSectionTitle>
                <CardOwner>
                  <Avatar
                    ligth
                    size="comment"
                    firstText={owner?.displayName}
                    secondText={owner?.profission}
                    image={owner?.thumbnailURL}
                  />
                  <Action onPress={clap}>
                    <Icon
                      source={isClapped ? 'clapsActive' : 'claps'}
                      tintColor={isClapped ? 'transparent' : 'ligth'}
                    />
                  </Action>
                </CardOwner>
              </>
            )}
            <CardOverlay />
          </CardSectionHeader>
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
