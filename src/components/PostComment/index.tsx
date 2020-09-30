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
import {Post} from './../../graphql/types.d';
import GuupDate from './../Date';

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
  claps,
  card = true,
  createdAt,
}: PostProps) => {
  const navigation = useNavigation<AppScreenNavigationProp>();
  const cleanPost: Post = {
    id: postID,
    description: postComment,
    commentsCount: comments,
    ownerProfile: {
      uid: owner?.id,
      displayName: owner?.ownerName,
      thumbnailURL: owner?.ownerPicture,
      profission: owner?.ownerProsiffion,
    },
    clapsCount: claps,
    createdAt,
  };
  return (
    <PostContainer>
      <PostHeader card={!!card}>
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
        <PostContent card={!!card}>
          <Text preset="comment">{postComment}</Text>
          {createdAt && (
            <>
              <Separator size="small" />
              <GuupDate date={createdAt} />
            </>
          )}
        </PostContent>
        <Separator size="small" />
        {media && (
          <PostMedia>
            <PostMediaImage source={{uri: media}} />
            <Separator size="small" />
          </PostMedia>
        )}
        <Separator size="stroke" />
        {showComments && (
          <PostActions card={!!card}>
            <Action
              onPress={() =>
                navigateComments
                  ? navigation.navigate('GuupComments', {post: cleanPost})
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
