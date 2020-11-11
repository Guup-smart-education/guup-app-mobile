/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {FlatList, View, Alert, ActivityIndicator} from 'react-native';
import {Container, Text, Icon, Action, Separator, Link} from './../../ui';
import {GuupHeader, PostComment} from './../../components';
import {PropsApp} from './../../@types/app.navigation';
import {
  PostsContainer,
  PostsHeader,
  PostsBody,
  PostItemContainer,
  EmptyContainer,
} from './_styled';
import {useIsFocused} from '@react-navigation/native';
import {useGetPostsByOwnerLazyQuery, Post} from './../../graphql/types.d';
import {GetUniqueId} from './../../helper';
import {LIMIT_PER_PAGE} from './../../constants';
import AuthContext from './../../contexts/auth';

// Component
const Posts: React.FC<PropsApp> = ({navigation: {goBack, navigate}}) => {
  const authContext = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [
    getPosts,
    {loading, data, error, fetchMore, refetch},
  ] = useGetPostsByOwnerLazyQuery();
  const [allPosts, setAllPosts] = useState<Array<Post>>([]);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [isNoMorePosts, setIsNoMorePosts] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  // Effects
  useEffect(() => {
    if (refetch && isFocused) {
      setIsRefetch(true);
      refetch();
    }
  }, [refetch, isFocused]);
  useEffect(() => {
    R.isEmpty(allPosts) && getPosts();
  }, [allPosts, getPosts]);

  useEffect(() => {
    if (fetchMore && loadMore && snapshot && !isNoMorePosts) {
      fetchMore({
        variables: {lastPost: snapshot},
      });
    }
  }, [snapshot, loadMore]);

  useEffect(() => {
    if (data?.getPostsByOwner?.__typename === 'GetPostsOwner') {
      const postsData: Array<any> = [
        ...(data.getPostsByOwner.allPostOwner || []),
      ];
      const unionCourses = R.union(
        [...(!isRefetch ? allPosts : [])],
        [...postsData],
      );
      setAllPosts(unionCourses);
      setIsNoMorePosts(postsData.length < LIMIT_PER_PAGE);
      setLoadMore(false);
      setSnapshot(null);
      setIsRefetch(false);
    } else if (data?.getPostsByOwner?.__typename === 'ErrorResponse') {
      Alert.alert('Aconteceu um erro', `${data.getPostsByOwner.error.message}`);
    }
  }, [data]);

  // End effects
  // Calbacks
  const keyExtractor = useCallback(
    ({id}: Post) => `collection-path-${id || GetUniqueId()}`,
    [],
  );

  const PostItem = useCallback(
    ({
      item: {
        id,
        owner,
        ownerProfile,
        description,
        commentsCount,
        photoURL,
        claps,
        clapsCount,
        createdAt,
      },
    }: {
      item: Post;
    }) => {
      const authUser = authContext.user || {};
      const clapped = claps && R.includes(`${authUser.uid}`, claps);
      return (
        <PostItemContainer>
          <Separator size="large" />
          <PostComment
            owner={{
              id: owner || ownerProfile?.uid,
              ownerName: ownerProfile?.displayName,
              ownerPicture: ownerProfile?.thumbnailURL,
              ownerProsiffion: ownerProfile?.profission,
            }}
            navigateProfile={false}
            id={id}
            postComment={description}
            showComments
            comments={commentsCount || 0}
            media={photoURL}
            claps={claps || []}
            clapsCount={clapsCount}
            createdAt={createdAt}
            clapped={clapped}
            menu
          />
        </PostItemContainer>
      );
    },
    [navigate],
  );
  const ListEmpty = useCallback(
    () => (
      <EmptyContainer>
        <Text center>Você não tem publicações ainda</Text>
        <Link onPress={() => navigate('GuupPostCreate')}>Criar um post</Link>
      </EmptyContainer>
    ),
    [navigate],
  );
  const ListLoadMore = useCallback(() => {
    if (loadMore) {
      return (
        <View>
          <Separator size="lili" />
          <ActivityIndicator />
          <Separator size="extraLarge" />
        </View>
      );
    }
    return <Separator size="large" />;
  }, [loadMore]);
  // End callbacks
  // Branchs
  if (loading) {
    return (
      <Container>
        <Text>Loading</Text>
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <Text>error</Text>
      </Container>
    );
  }
  // End branchas
  // Handlers
  const handlefetchMoreData = () => {
    if (
      !loadMore &&
      !snapshot &&
      !isNoMorePosts &&
      allPosts.length === LIMIT_PER_PAGE
    ) {
      const lastPath = R.last(allPosts)?.id;
      setLoadMore(true);
      setSnapshot(lastPath || null);
    }
  };

  const handleRefresh = () => {
    // setAllPostsData([]);
    setIsNoMorePosts(false);
    setLoadMore(false);
    setIsRefetch(true);
    refetch && refetch();
  };
  // End handlers
  return (
    <Container safe light>
      <PostsContainer>
        <PostsHeader>
          <GuupHeader
            leftRenderIntem={
              <Action onPress={() => goBack()}>
                <Icon source="arrow" />
              </Action>
            }
            centerRenderItem={
              <Text preset="comment" bold>
                Publicações
              </Text>
            }
            rightRenderIntem={
              <Action onPress={() => navigate('GuupPostCreate')}>
                <Icon source="plus" />
              </Action>
            }
          />
        </PostsHeader>
        {allPosts.length ? (
          <PostsBody>
            <FlatList
              style={{height: '100%'}}
              keyExtractor={keyExtractor}
              data={allPosts}
              renderItem={PostItem}
              showsVerticalScrollIndicator={false}
              scrollEnabled={!!allPosts.length}
              maxToRenderPerBatch={20}
              nestedScrollEnabled
              // ListEmptyComponent={ListEmpty}
              ListFooterComponent={ListLoadMore}
              onEndReachedThreshold={0.9}
              onEndReached={handlefetchMoreData}
              refreshing={loading}
              onRefresh={handleRefresh}
            />
          </PostsBody>
        ) : (
          <ListEmpty />
        )}
      </PostsContainer>
    </Container>
  );
};

export default Posts;
