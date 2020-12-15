/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useEffect, useState, useCallback, useContext} from 'react';
import {FlatList, ActivityIndicator, Alert} from 'react-native';
import {Separator, Text, Icon, Link, Container, BlockLoading} from './../../ui';
import {PostComment, GuupHeader} from './../../components';
import {
  NewsContainer,
  NewsHeader,
  NewsBody,
  NewsContent,
  NewsActions,
  NewsEmpty,
  NewsPost,
} from './_styled';
import {useIsFocused} from '@react-navigation/native';
import {PropsApp} from './../../@types/app.navigation';
import {GetUniqueId} from './../../helper';
import {LIMIT_PER_PAGE} from './../../constants';
import {
  Post,
  useGetAllPostsLazyQuery,
  useRemovePostMutation,
} from './../../graphql/types.d';
// import NewsLoading from './_loading';
import Authcontext from './../../contexts/auth';

interface IProstItem {
  item: Post;
}
// List empty data
const ListEmpty = () => {
  return (
    <Container center>
      <Text center>Não publicações disponiveis</Text>
      <Separator size="large" />
    </Container>
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

  const [
    removePost,
    {data: dataRemove, error: errorRemove, loading: loadingRemove},
  ] = useRemovePostMutation();

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
  useEffect(() => {
    if (!dataRemove || !dataRemove.removePost) {
      return;
    } else if (dataRemove.removePost.__typename === 'RemovePost') {
      const postRemoved = dataRemove.removePost.post;
      const newList = R.filter(
        (item: Post) => item.id !== postRemoved,
        allPostsData,
      );
      setAllPostsData(newList);
      Alert.alert(
        'Publicação removida!',
        'A sua publicação foi removida com sucesso',
      );
    } else if (
      dataRemove.removePost.__typename === 'ErrorResponse' ||
      errorRemove
    ) {
      Alert.alert(
        '`Oops!! ',
        `Aconteceu um erro: ${
          dataRemove.removePost.error.message || errorRemove?.message
        }`,
      );
    }
  }, [dataRemove, errorRemove]);
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
      <NewsPost>
        {/* <NewsPost style={shadowStyle.newPost}> */}
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
          card={false}
          onRemove={handRemovePost}
          model={item.owner === authUser.uid ? 'OWNER' : 'PUBLIC'}
          loading={loadingRemove}
        />
        {/* <Separator size="stroke" /> */}
        <Separator size="tiny" />
      </NewsPost>
    );
  }, []);
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

  const handRemovePost = async (post: string) => {
    Alert.alert('Remover conteudo', 'Deseja remover este conteudo?', [
      {
        text: 'Sim',
        onPress: () =>
          removePost({
            variables: {
              post,
            },
          }),
      },
      {
        text: 'Não',
        style: 'destructive',
      },
    ]);
  };
  // End Handlers

  return (
    <Container safe light>
      {/* {loadingRemove && <BlockLoading />} */}
      <NewsContainer>
        <NewsHeader>
          <NewsActions>
            <GuupHeader
              hasGuupIcon
              title="Noticias"
              rightRenderIntem={
                <Link
                  preset="simple"
                  onPress={() => navigate('GuupPostCreate')}>
                  <Icon source="plus" blur />
                </Link>
              }
            />
          </NewsActions>
          {/* <NewsTitle>
            <Text preset="header">Confira as ultimas novidades</Text>
          </NewsTitle>
          <Separator size="small" /> */}
          <Separator size="stroke" color="veryLigthGrey" />
        </NewsHeader>
        <NewsBody>
          <NewsContent>
            {R.isEmpty(allPostsData) && !loading ? (
              <ListEmpty />
            ) : !R.isEmpty(allPostsData) && !loading ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled={!!allPostsData.length}
                data={allPostsData}
                keyExtractor={keyExtractor}
                maxToRenderPerBatch={20}
                nestedScrollEnabled
                renderItem={PostItem}
                // ListEmptyComponent={ListEmpty}
                ListHeaderComponent={<Separator size="tiny" />}
                ListFooterComponent={
                  <ListLoadMore loading={loadMore && !isNoMorePosts} />
                }
                onEndReachedThreshold={0}
                onEndReached={handlefetchMoreData}
                refreshing={loading}
                onRefresh={handleRefresh}
              />
            ) : (
              <Container center>
                <ActivityIndicator size="small" />
              </Container>
            )}
          </NewsContent>
        </NewsBody>
      </NewsContainer>
    </Container>
  );
};

export default NewsScreen;
