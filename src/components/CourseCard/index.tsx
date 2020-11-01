import R from 'ramda';
import React, {useState} from 'react';
import {Alert, View, ActivityIndicator} from 'react-native';
import {Maybe} from 'graphql/jsutils/Maybe';
import {
  CardContainer,
  CardSectionBody,
  CardSectionTop,
  CardContent,
  CardActions,
  CardSectionHeader,
  CardBottomActions,
} from './_styled';
import {
  Text,
  Icon,
  Separator,
  Action,
  GroupAvatar,
  Link,
  Dot,
} from './../../ui';
import Avatar from './../Avatar';
import Popover from './../Popover';
import GuupDate from './../Date';
import MenuList from './../MenuList';
import {IMenuItemProps} from './../../@types/menu.item';
import {EModel, ECourse} from './../../@enum/course.model';
import {
  UserProfile,
  EnumContentType,
  Course,
  Path,
} from './../../graphql/types.d';
// import {EditCollectionScreenNavigationProp} from './../../@types/app.navigation';
// import {useNavigation} from '@react-navigation/native';

export interface Props {
  readonly id: string;
  readonly type: keyof typeof ECourse;
  readonly model?: keyof typeof EModel;
  readonly contentType?: keyof typeof EnumContentType;
  readonly imageUri?: string;
  readonly title?: string;
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
            onPress: () => Alert.alert('Ver!!', 'Ver mais tarde'),
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
  return (
    <CardContainer>
      <Action onPress={() => onPress && onPress()}>
        <View>
          {!R.isNil(imageUri) && !R.isEmpty(imageUri) && (
            <CardSectionHeader>
              <CardSectionTop
                source={{uri: imageUri}}
                onLoadStart={() => setImgLoading(true)}
                onLoadEnd={() => setImgLoading(false)}>
                {imgLoading && <ActivityIndicator />}
              </CardSectionTop>
            </CardSectionHeader>
          )}
          <CardSectionBody>
            <CardContent>
              <View>
                {createdAt && <GuupDate date={createdAt} />}
                <Separator size="lili" />
                <Text preset="comment" bold lineHeight={21}>
                  {title}
                </Text>
              </View>
              {content && (
                <>
                  <Separator size="lili" />
                  <Text preset="label" color="greyBrown">
                    {content}
                  </Text>
                </>
              )}
              <Separator size="small" />
              {type === 'COURSE' || !owners || owners.length === 1 ? (
                <Avatar
                  size="comment"
                  firstText={owner?.displayName}
                  secondText={owner?.profission}
                  image={owner?.thumbnailURL}
                />
              ) : (
                <GroupAvatar
                  avatars={owners.map((item) => item?.thumbnailURL)}
                />
              )}
            </CardContent>
            <CardActions>
              <Action onPress={() => setShowOptions(true)}>
                <Icon
                  source="dots"
                  tintColor="ultraDark"
                  backColor="veryLigthGrey"
                  size="small"
                />
              </Action>
            </CardActions>
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
