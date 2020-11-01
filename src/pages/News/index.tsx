/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useEffect, useState, useCallback, useContext} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {Separator, Text, Icon, Link, Container} from './../../ui';
import {PostComment, GuupHeader} from './../../components';
import {
  NewsContainer,
  NewsHeader,
  NewsBody,
  NewsContent,
  NewsActions,
  NewsTitle,
  NewsEmpty,
  NewsPost,
} from './_styled';
import {useIsFocused} from '@react-navigation/native';
import {PropsApp} from './../../@types/app.navigation';
import {GetUniqueId, shadowStyle} from './../../helper';
import {LIMIT_PER_PAGE} from './../../constants';
import {Post, useGetAllPostsLazyQuery} from './../../graphql/types.d';
import NewsLoading from './_loading';
import Authcontext from './../../contexts/auth';

interface IProstItem {
  item: Post;
}
// List empty data
const ListEmpty = () => {
  return (
    <NewsEmpty>
      <Text center>Não publicações disponiveis</Text>
    </NewsEmpty>
  );
};
// List loading more
const ListLoadMore = ({loading}: {loading: boolean}) => {
  if (loading) {
    return (
      <NewsEmpty>
        {/* <Separator size="lili" /> */}
        <ActivityIndicator />
        {/* <Separator size="extraLarge" /> */}
      </NewsEmpty>
    );
  }
  return <NewsEmpty />;
};
// Principal component
const NewsScreen: React.FC<PropsApp> = ({navigation: {navigate}}) => {
  const isFocused = useIsFocused();
  const authContext = useContext(Authcontext);
  const [allPostsData, setAllPostsData] = useState<Array<Post>>([]);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [isNoMorePosts, setIsNoMorePosts] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [
    getAllPosts,
    {data, error, loading, fetchMore, refetch},
  ] = useGetAllPostsLazyQuery();

  // Effects
  useEffect(() => {
    R.isEmpty(allPostsData) && getAllPosts();
  }, [getAllPosts]);

  useEffect(() => {
    if (refetch && isFocused) {
      setIsRefetch(true);
      refetch();
    }
  }, [refetch, isFocused]);

  useEffect(() => {
    if (fetchMore && loadMore && snapshot) {
      fetchMore({
        variables: {lastPost: snapshot},
      });
    }
  }, [snapshot, loadMore]);

  useEffect(() => {
    if (data?.getAllPosts?.__typename === 'GetPosts') {
      const allPosts: Array<Post> =
        data.getAllPosts.allPost || Array(0).fill({});
      const unionPosts = R.union(
        [...(!isRefetch ? allPostsData : [])],
        [...allPosts],
      );
      setIsNoMorePosts(allPosts.length < LIMIT_PER_PAGE);
      setLoadMore(false);
      setSnapshot(null);
      setAllPostsData(unionPosts);
      setIsRefetch(false);
    }
  }, [data]);

  // End effects

  // Calbacks
  const keyExtractor = useCallback(
    ({id}: Post) => `news-post-${id || GetUniqueId()}`,
    [],
  );

  const PostItem = useCallback(({item}: IProstItem) => {
    const {
      id,
      owner,
      ownerProfile,
      description,
      commentsCount,
      photoURL,
      claps,
      clapsCount,
      createdAt,
    } = item;
    const authUser = authContext.user || {};
    const clapped = claps && R.includes(`${authUser.uid}`, claps);
    return (
      <NewsPost style={shadowStyle.newPost}>
        <PostComment
          owner={{
            id: owner || ownerProfile?.uid,
            ownerName: ownerProfile?.displayName,
            ownerPicture: ownerProfile?.thumbnailURL,
            ownerProsiffion: ownerProfile?.profission,
          }}
          id={id}
          postComment={description}
          showComments
          comments={commentsCount || 0}
          media={photoURL}
          claps={claps || []}
          clapsCount={clapsCount}
          createdAt={createdAt}
          clapped={!!clapped}
          menu
        />
        <Separator size="large" />
      </NewsPost>
    );
  }, []);
  const ListHeader = useCallback(
    () => (
      <NewsHeader>
        <NewsActions>
          <GuupHeader
            leftRenderIntem={<Icon source="guup" size="small" />}
            rightRenderIntem={
              <Link preset="simple" onPress={() => navigate('GuupPostCreate')}>
                <Icon source="plus" />
              </Link>
            }
          />
        </NewsActions>
        <Separator size="tiny" />
        <NewsTitle>
          <Text preset="largePrice">
            Confira as ultimas novidades na empresa
          </Text>
        </NewsTitle>
        <Separator size="large" />
      </NewsHeader>
    ),
    [],
  );
  // End callbacks

  // Render Branchs
  if (data?.getAllPosts?.__typename === 'ErrorResponse') {
    return (
      <Text color="primary" bold>
        {data.getAllPosts.error.message}
      </Text>
    );
  }
  if (error) {
    return (
      <Text color="primary" bold>
        {error.message}
      </Text>
    );
  }
  if (loading) {
    return <NewsLoading />;
  }

  // Handlers
  const handlefetchMoreData = () => {
    if (
      !loadMore &&
      !snapshot &&
      !isNoMorePosts &&
      allPostsData.length >= LIMIT_PER_PAGE
    ) {
      const lastPost = R.last(allPostsData)?.id;
      setLoadMore(true);
      setSnapshot(lastPost || null);
    }
  };

  const handleRefresh = () => {
    // setAllPostsData([]);
    setIsNoMorePosts(false);
    setLoadMore(false);
    setIsRefetch(true);
    refetch && refetch();
  };
  // End Handlers

  return (
    <Container safe>
      <NewsContainer>
        <NewsBody>
          <NewsContent>
            {allPostsData && (
              <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled={!!allPostsData}
                data={allPostsData}
                keyExtractor={keyExtractor}
                maxToRenderPerBatch={20}
                nestedScrollEnabled
                renderItem={PostItem}
                ListEmptyComponent={ListEmpty}
                ListHeaderComponent={ListHeader}
                ListFooterComponent={
                  <ListLoadMore loading={loadMore && !isNoMorePosts} />
                }
                onEndReachedThreshold={0}
                onEndReached={handlefetchMoreData}
                refreshing={loading}
                onRefresh={handleRefresh}
              />
            )}
          </NewsContent>
        </NewsBody>
      </NewsContainer>
    </Container>
  );
};

export default NewsScreen;
