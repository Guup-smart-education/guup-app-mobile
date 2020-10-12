import R from 'ramda';
import React from 'react';
import {Alert} from 'react-native';
import {Maybe} from 'graphql/jsutils/Maybe';
import {
  CardContainer,
  CardSectionBody,
  CardSectionTop,
  CardContent,
  CardActions,
} from './_styled';
import {Text, Icon, Separator, Action, GroupAvatar} from './../../ui';
import Avatar from './../Avatar';
import {UserProfile} from './../../graphql/types.d';

enum ECourse {
  'PATH' = 'PATH',
  'COURSE' = 'COURSE',
}

export interface Props {
  readonly type: keyof typeof ECourse;
  readonly imageUri?: string;
  readonly title?: string;
  readonly content?: string;
  readonly owner?: UserProfile | undefined;
  readonly owners?: Maybe<UserProfile>[] | undefined | null;
  readonly onPress?: () => void;
}

const CourseCard: React.FC<Props> = ({
  type,
  imageUri,
  title,
  content,
  onPress,
  owner,
  owners,
}) => {
  console.log('course card: owner = ', owner);
  console.log('course card: owners = ', owners);
  return (
    <CardContainer>
      {!R.isEmpty(imageUri) && (
        <Action onPress={onPress}>
          <CardSectionTop source={{uri: imageUri}} />
        </Action>
      )}
      <CardSectionBody>
        <CardContent>
          <Action onPress={onPress}>
            <Text preset="comment" bold lineHeight={21}>
              {title}
            </Text>
          </Action>
          {content && (
            <>
              <Separator size="lili" />
              <Text preset="label" color="greyBrown">
                {content}
              </Text>
            </>
          )}
          <Separator size="lili" />
          <Separator size="lili" />
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
        </CardContent>
        <CardActions>
          {type === 'COURSE' ? (
            <Action
              onPress={() =>
                Alert.alert('Attach course', 'Save this content for later')
              }>
              <Icon source="save" tintColor="dark" />
            </Action>
          ) : (
            <Action
              onPress={() =>
                Alert.alert(
                  'Notify me',
                  'Give me notifications about this content',
                )
              }>
              <Icon source="bell" />
            </Action>
          )}
        </CardActions>
      </CardSectionBody>
    </CardContainer>
  );
};

export default CourseCard;
