import React from 'react';
import {Avatar} from './../';
import {Text, Separator, Icon, Action} from './../../ui';
import {
  PostContainer,
  PostHeader,
  PostBody,
  PostContent,
  PostActions,
  PostActionItem,
  PostMedia,
  PostMediaImage,
} from './_styled';
import {useNavigation} from '@react-navigation/native';
import {PostProps} from './../../@types/post.comment';
import {AppScreenNavigationProp} from './../../@types/app.navigation';
import {Alert, View} from 'react-native';

export default ({
  id: postID,
  owner,
  postComment,
  menu,
  ratingValue,
  navigateProfile = true,
  showComments,
  navigateComments = true,
  comments,
  media,
}: PostProps) => {
  const navigation = useNavigation<AppScreenNavigationProp>();
  return (
    <PostContainer>
      <PostHeader>
        <Action
          onPress={() =>
            navigateProfile
              ? navigation.navigate('GuupUserProfile', {type: 'student'})
              : {}
          }>
          <View>
            <Avatar
              size="normal"
              image={owner && owner.ownerPicture}
              firstText={owner && owner.ownerName}
              secondText={owner && owner.ownerProsiffion}
            />
          </View>
        </Action>
        {ratingValue && (
          <Action
            onPress={() =>
              Alert.alert('Rating', 'Show something from rating value')
            }>
            <Text bold>{ratingValue}</Text>
          </Action>
        )}
        {menu && (
          <Action
            onPress={() => Alert.alert('Show menu post', 'Add menu post her')}>
            <Icon source="dots" />
          </Action>
        )}
      </PostHeader>
      <Separator size="tiny" />
      <PostBody>
        <PostContent>
          <Text preset="comment">{postComment}</Text>
        </PostContent>
        <Separator size="small" />
        {media && (
          <PostMedia>
            <PostMediaImage source={{uri: media}} />
            <Separator size="small" />
          </PostMedia>
        )}
        {showComments && (
          <PostActions>
            <Action
              onPress={() =>
                navigateComments
                  ? navigation.navigate('GuupComments', {id: postID})
                  : {}
              }>
              <PostActionItem>
                <Text preset="label" color="dark" bold underline>
                  {comments} comentarios
                </Text>
              </PostActionItem>
            </Action>
            <PostActionItem>
              <Icon source="claps" />
            </PostActionItem>
          </PostActions>
        )}
      </PostBody>
    </PostContainer>
  );
};
