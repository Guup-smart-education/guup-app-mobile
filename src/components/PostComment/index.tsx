import React, {useState, useEffect} from 'react';
import {Avatar} from './../';
import {Text, Separator, Icon, Action, ActivityIndicator} from './../../ui';
import Popover from './../Popover';
import MenuList from './../MenuList';

import {
  PostContainer,
  PostHeader,
  PostBody,
  PostContent,
  PostActions,
  PostActionItem,
  PostMedia,
} from './_styled';
import {useNavigation} from '@react-navigation/native';
import {PostProps} from './../../@types/post.comment';
import {IMenuItemProps} from './../../@types/menu.item';
import {AppScreenNavigationProp} from './../../@types/app.navigation';
import {Alert, StyleSheet, View} from 'react-native';
import {ClapFor, Post, useClapPostMutation} from './../../graphql/types.d';
import GuupDate from './../Date';
import FastImage from 'react-native-fast-image';

export default ({
  id: postID,
  owner,
  postComment,
  menu,
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
  model = 'PUBLIC',
  onRemove,
  loading,
}: PostProps) => {
  const navigation = useNavigation<AppScreenNavigationProp>();
  const OPTIONS_ITEMS: Array<IMenuItemProps> =
    model === 'OWNER'
      ? [
          {
            text: 'Remover conteudo',
            onPress: () => remove(`${postID}`),
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
  const [isClapped, setIsClapped] = useState<boolean>(!!clapped);
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
  // useEffect(() => {
  //   if (loading !== undefined) {
  //     setShowOptions(!loading);
  //   }
  // }, [loading]);
  // End useeffects
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
  const remove = (key: string) => onRemove(key);
  // End handlers
  return (
    <PostContainer>
      <PostHeader card={!!card}>
        <Action
          onPress={() =>
            navigateProfile
              ? navigation.navigate('GuupUserProfile', {
                  type: 'PUBLIC',
                  id: `${owner ? owner.id : ''}`,
                  // id: `${model === 'PUBLIC' && owner ? owner.id : ''}`,
                })
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
          <Action onPress={() => setShowOptions(!showOptions)}>
            <Icon source="dots" backColor="veryLigthGrey" size="small" />
          </Action>
        )}
      </PostHeader>
      <Separator size="tiny" />
      {!!media && (
        <>
          <PostMedia>
            <FastImage
              style={StyleSheet.absoluteFill}
              source={{uri: media, priority: FastImage.priority.high}}
              resizeMode={FastImage.resizeMode.cover}
              onLoadStart={() => setImgLoading(true)}
              onLoadEnd={() => setImgLoading(false)}
            />
            {imgLoading && <ActivityIndicator color="dark" size="small" />}
            {/* <PostMediaImage source={{uri: media}} /> */}
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
      <Popover
        visible={showOptions}
        height={50 + OPTIONS_ITEMS.length * 44}
        toggle={() => setShowOptions(false)}>
        <MenuList menuItems={OPTIONS_ITEMS} hideChevron compress noBorder />
      </Popover>
    </PostContainer>
  );
};
