import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {Separator, Text} from './../../ui';
import {PostComment} from './../../components';
import {NewsContainer, NewsHeader, NewsBody, NewsContent} from './_styled';
import {PropsApp} from './../../@types/app.navigation';
import {GetUniqueId} from './../../helper';
import {useGetAllPostsQuery, Post, UGetAllPost} from './../../graphql/types.d';

interface IProstItem {
  item: Post;
}

const PostItem = ({item}: IProstItem) => {
  const {id, ownerProfile, description, commentsCount, photoURL} = item;
  return (
    <>
      <PostComment
        owner={{
          ownerName: ownerProfile?.displayName,
          ownerPicture: ownerProfile?.photoURL,
          ownerProsiffion: ownerProfile?.profission,
        }}
        id={id}
        postComment={description}
        showComments
        comments={commentsCount || 0}
        media={photoURL}
      />
      <Separator size="large" />
    </>
  );
};

const NewsScreen: React.FC<PropsApp> = () => {
  const [allPostsData, setAllPostsData] = useState<Array<Post | null>>();
  const {data, error, loading, fetchMore} = useGetAllPostsQuery();

  useEffect(() => {
    if (data?.getAllPosts?.__typename === 'GetPosts') {
      const allPosts: Array<Post | null> = data.getAllPosts.allPost || [];
      setAllPostsData(allPosts);
    }
  }, [data, allPostsData]);

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
    return (
      <Text color="dark" bold>
        Carregando
      </Text>
    );
  }

  const fetchMoreData = () => {
    fetchMore({
      updateQuery: (previus: any, {next}: any) => {
        console.log('next', next);
        if (!next) {
          return true;
        }
        return Object.assign({}, previus, {
          getAllPosts: {
            allPost: [
              ...previus.getAllPosts.allPost,
              ...next.getAllPosts.allPost,
            ],
          },
        });
      },
    });
  };

  return (
    <NewsContainer>
      <NewsBody>
        <NewsContent>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={({id}) => id || GetUniqueId()}
            data={allPostsData}
            maxToRenderPerBatch={20}
            nestedScrollEnabled
            // FlatList inside components
            renderItem={PostItem}
            ListEmptyComponent={() => <Text>Nada para te mostrar</Text>}
            ListHeaderComponent={() => (
              <>
                <Separator size="large" />
                <NewsHeader>
                  <Text preset="largePrice">
                    Confira as ultimas novidades na empresa
                  </Text>
                </NewsHeader>
                <Separator size="large" />
              </>
            )}
            ListFooterComponent={() => <Separator size="medium" />}
            refreshing={loading}
            onRefresh={() => fetchMoreData()}
          />
        </NewsContent>
      </NewsBody>
    </NewsContainer>
  );
};

export default NewsScreen;
