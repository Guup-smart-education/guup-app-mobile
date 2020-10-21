import R from 'ramda';
import React from 'react';
import {Alert, View} from 'react-native';
import {Maybe} from 'graphql/jsutils/Maybe';
import {
  CardContainer,
  CardSectionBody,
  CardSectionTop,
  CardContent,
  CardActions,
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
import GuupDate from './../Date';
import {UserProfile, EnumContentType} from './../../graphql/types.d';
// import {EditCollectionScreenNavigationProp} from './../../@types/app.navigation';
// import {useNavigation} from '@react-navigation/native';

enum ECourse {
  'PATH' = 'PATH',
  'COURSE' = 'COURSE',
}

enum EModel {
  'OWNER' = 'ONWER',
  'PUBLIC' = 'PUBLIC',
}

export interface Props {
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
}) => {
  // const {navigate} = useNavigation<EditCollectionScreenNavigationProp>();
  return (
    <CardContainer>
      <Action onPress={() => onPress && onPress()}>
        <CardSectionBody>
          {/* {!R.isNil(imageUri) && !R.isEmpty(imageUri) && (
            <CardSectionTop source={{uri: imageUri}} />
          )} */}
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
              <GroupAvatar avatars={owners.map((item) => item?.thumbnailURL)} />
            )}
            {/* {model === 'OWNER' && (
              <>
                <Separator size="small" />
                <CardBottomActions>
                  <Link
                    color="primary"
                    onPress={() =>
                      Alert.alert('Comments', 'navigate to comments')
                    }>
                    0 comentarios
                  </Link>
                  <Dot />
                  <Link
                    color="dark"
                    onPress={() => Alert.alert('Claps', 'Show all claps')}>
                    0 claps
                  </Link>
                </CardBottomActions>
              </>
            )} */}
          </CardContent>
          <CardActions>
            {R.cond([
              [
                R.equals('OWNER'),
                () => {
                  return (
                    <Action
                      onPress={() =>
                        Alert.alert('Options', 'Show options for collection')
                      }>
                      <Icon
                        source="dots"
                        tintColor="ultraDark"
                        backColor="veryLigthGrey"
                        size="small"
                      />
                    </Action>
                  );
                },
              ],
              [
                R.T,
                () => {
                  if (type === 'COURSE') {
                    return (
                      <Action
                        onPress={() =>
                          Alert.alert(
                            'Attach course',
                            'Save this content for later',
                          )
                        }>
                        <Icon source="save" tintColor="ultraDark" />
                      </Action>
                    );
                  }
                  return (
                    <Action
                      onPress={() =>
                        Alert.alert(
                          'Notify me',
                          'Give me notifications about this content',
                        )
                      }>
                      <Icon source="bell" />
                    </Action>
                  );
                },
              ],
            ])(model)}
          </CardActions>
        </CardSectionBody>
      </Action>
    </CardContainer>
  );
};

export default CourseCard;
