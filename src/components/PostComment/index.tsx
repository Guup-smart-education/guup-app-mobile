import React, {useState, useEffect} from 'react';
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
import {ClapFor, Post, useClapPostMutation} from './../../graphql/types.d';
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
  clapsCount,
  clapped = false,
  card = true,
  createdAt,
}: PostProps) => {
  const navigation = useNavigation<AppScreenNavigationProp>();
  const [isClapped, setIsClapped] = useState<boolean>(clapped);
  const [sendClap, {data, error}] = useClapPostMutation();
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
    claps,
    clapsCount,
    createdAt,
    clapped,
  };
  // Effects
  useEffect(() => {
    if (data?.clapPost?.__typename === 'ErrorResponse') {
      Alert.alert('Aconteceu um problema', `${data.clapPost.error.message}`);
    } else if (error) {
      Alert.alert('Aconteceu um problema', `${error.message}`);
    }
  }, [data, error]);
  // Handlers
  const clapPost = () => {
    setIsClapped(!isClapped);
    sendClap({
      variables: {
        collection: ClapFor.Post,
        post: `${postID}`,
      },
    });
  };
  return (
    <PostContainer>
      <PostHeader card={!!card}>
        <Action
          onPress={() =>
            navigateProfile
              ? navigation.navigate('GuupUserProfile', {type: 'PUBLIC'})
              : {}
          }>
          <View>
            <Avatar
              size="comment"
              image={owner && owner.ownerPicture}
              firstText={owner && owner.ownerName}
              secondText={owner && owner.ownerProsiffion}
            />
          </View>
        </Action>
        {menu && (
          <Action
            onPress={() => Alert.alert('Show menu post', 'Add menu post her')}>
            <Icon source="dots" backColor="veryLigthGrey" size="small" />
          </Action>
        )}
      </PostHeader>
      <Separator size="tiny" />
      {!!media && (
        <>
          <PostMedia>
            <PostMediaImage source={{uri: media}} />
          </PostMedia>
          <Separator size="small" />
        </>
      )}
      <PostBody>
        <PostContent card={!!card}>
          <Text preset="paragraph">{postComment}</Text>
          {createdAt && (
            <>
              <Separator size="small" />
              <GuupDate date={createdAt} />
            </>
          )}
        </PostContent>
        <Separator size="small" />
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
                <Text preset="comment" color="dark" bold underline>
                  {comments} comentarios
                </Text>
              </PostActionItem>
            </Action>
            <Action onPress={() => clapPost()}>
              <PostActionItem>
                <Icon source={isClapped ? 'clapsActive' : 'claps'} />
              </PostActionItem>
            </Action>
          </PostActions>
        )}
      </PostBody>
    </PostContainer>
  );
};
