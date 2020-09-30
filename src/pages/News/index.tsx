/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useEffect, useState, useCallback} from 'react';
import {Alert, FlatList, ActivityIndicator} from 'react-native';
import {Separator, Text, Icon, Link, Container} from './../../ui';
import {PostComment, GuupHeader, CreateComment} from './../../components';
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
import {PropsApp} from './../../@types/app.navigation';
import {GetUniqueId} from './../../helper';
import {
  Post,
  useCreatePostMutation,
  useGetAllPostsLazyQuery,
} from './../../graphql/types.d';
import NewsLoading from './_loading';

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
const ListLoadMore = ({loading}) => {
  if (loading) {
    return (
      <NewsEmpty>
        <Text center>Carregando mais coisas</Text>
        <Separator size="lili" />
        <ActivityIndicator />
        <Separator size="extraLarge" />
      </NewsEmpty>
    );
  }
  return <NewsEmpty />;
};
// Principal component
const NewsScreen: React.FC<PropsApp> = () => {
  const [allPostsData, setAllPostsData] = useState<Array<Post>>([]);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [isNoMorePosts, setIsNoMorePosts] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [
    getAllPosts,
    {data, error, loading, fetchMore, refetch},
  ] = useGetAllPostsLazyQuery({
    // notifyOnNetworkStatusChange: true,
  });
  const [toggleComment, setToggleComment] = useState(false);
  const [
    creaPostMutation,
    {data: dataCreatePost, loading: loadCreatePost, error: errorCreatePost},
  ] = useCreatePostMutation({notifyOnNetworkStatusChange: true});

  // Effects
  useEffect(() => {
    R.isEmpty(allPostsData) && getAllPosts();
  }, [getAllPosts]);

  // useEffect(() => {
  //   refetch && refetch();
  // }, [refetch, isRefetch]);

  useEffect(() => {
    if (fetchMore && loadMore && snapshot) {
      fetchMore({
        variables: {lastPost: snapshot},
      });
    }
  }, [snapshot, loadMore]);

  useEffect(() => {
    if (data?.getAllPosts?.__typename === 'GetPosts') {
      console.log('data?.getAllPosts', data.getAllPosts.allPost);
      const allPosts: Array<Post> =
        data.getAllPosts.allPost || Array(0).fill({});
      setIsNoMorePosts(R.isEmpty(allPosts));
      setLoadMore(false);
      setSnapshot(null);
      // setAllPostsData(allPosts);
      setAllPostsData([...(!isRefetch ? allPostsData : []), ...allPosts]);
      setIsRefetch(false);
    }
  }, [data]);

  useEffect(() => {
    if (dataCreatePost?.createPost?.__typename === 'ErrorResponse') {
      Alert.alert(
        'Aconteceu um error',
        dataCreatePost.createPost.error.message || 'Ops!! Aconteceu um erro',
      );
    } else if (dataCreatePost?.createPost?.__typename === 'CreatePost') {
      const {createPost} = dataCreatePost.createPost;
      createPost && setAllPostsData([createPost, ...allPostsData]);
      setToggleComment(false);
    }
  }, [dataCreatePost, errorCreatePost]);

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
      clapsCount,
      createdAt,
    } = item;
    return (
      <NewsPost>
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
          claps={clapsCount}
          createdAt={createdAt}
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
            leftRenderIntem={<Icon source="guup" />}
            rightRenderIntem={
              <Link
                preset="simple"
                onPress={() => setToggleComment(!toggleComment)}>
                Criar post +
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
    if (!loadMore && !snapshot && !isNoMorePosts) {
      const lastPost = R.last(allPostsData)?.id;
      setLoadMore(true);
      setSnapshot(lastPost || null);
    }
  };

  const handleCreateNewPost = (postComment: string) => {
    creaPostMutation({
      variables: {
        description: postComment,
      },
    });
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
    <Container safe center={false}>
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
                ListFooterComponent={<ListLoadMore loading={loadMore} />}
                onEndReachedThreshold={0}
                onEndReached={handlefetchMoreData}
                refreshing={loading}
                onRefresh={handleRefresh}
              />
            )}
          </NewsContent>
        </NewsBody>
      </NewsContainer>
      {/* Show post creator */}
      <CreateComment
        show={toggleComment}
        loading={loadCreatePost}
        toggleModal={() => setToggleComment(!toggleComment)}
        onSendMessage={(comment: string) => handleCreateNewPost(comment)}
      />
    </Container>
  );
};

export default NewsScreen;
