/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  Link,
  Separator,
  Action,
  Icon,
  Container,
  HeaderPatch,
  FooterPatch,
  Button,
} from './../../ui';
import {GetUniqueId} from './../../helper';
import {
  PostComment,
  CreateComment,
  GuupComment,
  GuupHeader,
  GuupFooter,
} from './../../components';
import {CommentPropsApp} from './../../@types/app.navigation';
import {
  CommentsContainer,
  CommentsDetailContainer,
  CommentsDetail,
  CommentsContent,
  CommentsActions,
  CommentsEmpty,
  CommentsList,
  CommentListItem,
  CommentNav,
  CommentListFooter,
} from './_styled';
import {
  Comments,
  useGetCommentByPostLazyQuery,
  useCreateCommentMutation,
  CommentFor,
  Post,
} from './../../graphql/types.d';
import {FlatList, ActivityIndicator, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CommentScreenNavigationProp} from './../../@types/app.navigation';
import {LIMIT_LIST} from './../../constants';

// List component
const CommentListSection: React.FC<{
  post: Post;
  newComment?: Comments;
  myCommentsCount: number;
}> = ({post, newComment, myCommentsCount}) => {
  const navigation = useNavigation<CommentScreenNavigationProp>();
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [isNoMoreData, setIsNoMoreData] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<Comments>>([]);
  const [
    getAllComments,
    {data, loading, error, refetch, fetchMore},
  ] = useGetCommentByPostLazyQuery({
    variables: {post: post.id || ''},
  });

  // Effects
  useEffect(() => {
    R.isEmpty(comments) && getAllComments();
    return () => {
      setComments([]);
    };
  }, [getAllComments]);

  useEffect(() => {
    refetch && refetch();
  }, [refetch]);

  useEffect(() => {
    if (fetchMore && loadMore && snapshot && !isNoMoreData) {
      fetchMore({
        variables: {
          post: post.id,
          lastComment: snapshot,
        },
      });
    }
  }, [snapshot, loadMore]);

  useEffect(() => {
    if (data?.getCommentByPost?.__typename === 'ErrorResponse') {
      Alert.alert(
        'Aconteceu um erro',
        `${data.getCommentByPost.error.message}`,
      );
    } else if (
      data?.getCommentByPost?.__typename === 'GetComment' &&
      !!data.getCommentByPost.comments
    ) {
      const {comments: dataComments} = data.getCommentByPost;
      const formatComments = dataComments.map(
        (item): Comments => ({
          id: item?.id,
          description: item?.description,
          owner: item?.owner,
          ownerProfile: item?.ownerProfile,
          createdAt: item?.createdAt,
        }),
      );

      const unionData = R.union(
        [...(!isRefetch ? comments : [])],
        [...formatComments],
      );
      setComments(unionData);
      setIsNoMoreData(formatComments.length < LIMIT_LIST.tiny);
      setIsRefetch(false);
      setLoadMore(false);
      setSnapshot(null);
    }
  }, [data]);

  useEffect(() => {
    if (newComment && !R.find(R.eqProps('id', newComment.id))(comments)) {
      setComments([{...newComment}, ...comments]);
    }
  }, [newComment]);
  // End effects
  // Handlers
  const handlefetchMoreData = () => {
    if (
      !loadMore &&
      !snapshot &&
      !isNoMoreData &&
      comments.length >= LIMIT_LIST.tiny
    ) {
      const lastComment = R.last(comments)?.id;
      setLoadMore(true);
      setSnapshot(lastComment || null);
    }
  };
  // End handlers
  // Callbacks
  const keyExtractor = useCallback(
    ({id}: Comments) => `post-comment-${id || GetUniqueId()}`,
    [],
  );

  const CommentItem = useCallback(({item}) => {
    return (
      <CommentListItem>
        <GuupComment {...item} />
      </CommentListItem>
    );
  }, []);
  // End callbacks

  // Callbacks
  const CommentDetail = useCallback(() => {
    return (
      <>
        <CommentsDetailContainer>
          <CommentsDetail focusable={false} scrollEnabled={false}>
            <PostComment
              {...{
                id: post?.id,
                claps: post?.clapsCount,
                comments: (post?.commentsCount || 0) + myCommentsCount,
                postComment: post?.description,
                owner: {
                  id: post?.owner || post?.ownerProfile?.uid,
                  ownerName: post?.ownerProfile?.displayName,
                  ownerPicture: post?.ownerProfile?.thumbnailURL,
                  ownerProsiffion: post?.ownerProfile?.profission,
                },
                createdAt: post.createdAt,
              }}
              showComments
              card={false}
              navigateComments={false}
              clapped={post.clapped}
            />
          </CommentsDetail>
        </CommentsDetailContainer>
        <Separator size="large" />
      </>
    );
  }, [myCommentsCount]);

  const ListEmpty = useCallback(
    () => (
      <CommentsEmpty>
        <Text>Ainda não há commentarios</Text>
      </CommentsEmpty>
    ),
    [],
  );
  const ListLoadMore = useCallback(() => {
    if (comments.length >= LIMIT_LIST.tiny) {
      return (
        <CommentListFooter>
          <Button
            loading={loading || loadMore}
            disable={loading || loadMore || isNoMoreData}
            onPress={() => handlefetchMoreData()}
            text={isNoMoreData ? 'Não há mais conteudo' : 'trazer mais'}
          />
        </CommentListFooter>
      );
    }
    return <Separator size="large" />;
  }, [loadMore, comments]);
  // End callbacks

  // Branchs
  if (loading) {
    return (
      <CommentsEmpty>
        <ActivityIndicator />
      </CommentsEmpty>
    );
  }
  if (error) {
    return (
      <CommentsEmpty>
        <Text>{error.message}</Text>
      </CommentsEmpty>
    );
  }
  // End branchs

  return (
    <CommentsList>
      <CommentNav>
        <GuupHeader
          hasBack
          title="Comentarios"
          loading={loading}
          onLeftPress={() => navigation.goBack()}
          rightRenderIntem={
            <Action
              onPress={() =>
                Alert.alert('Options comments', 'Show comments options')
              }>
              <Icon source="dots" backColor="veryLigthGrey" size="small" />
            </Action>
          }
        />
      </CommentNav>
      <FlatList
        data={comments}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={CommentItem}
        ListHeaderComponent={CommentDetail}
        ListFooterComponent={ListLoadMore}
        ListEmptyComponent={ListEmpty}
      />
    </CommentsList>
  );
};

// Principal component
const CommentsScreen: React.FC<CommentPropsApp> = ({
  route: {
    params: {post},
  },
}) => {
  const [createComment, showCreateComment] = useState(false);
  const [newComment, setNewComment] = useState<Comments>();
  const [countComments, setCountComments] = useState<number>(0);
  const [commentMutation, {loading, error}] = useCreateCommentMutation();

  // Effects
  useEffect(() => {
    if (error) {
      Alert.alert('Aconteceu um error', `${error}`);
    }
  }, [error]);
  // End effect

  // Handlers
  const toggleComment = () => {
    showCreateComment(!createComment);
  };
  const sendComment = (comment: string) => {
    commentMutation({
      variables: {
        collection: CommentFor.Post,
        post: post?.id || '',
        description: comment,
      },
      update: (store, {data: updateData}) => {
        if (updateData?.createComment?.__typename === 'PostComment') {
          const {comment: commentCreated} = updateData.createComment;
          showCreateComment(false);
          commentCreated && setNewComment(commentCreated);
          setCountComments(countComments + 1);
        }
        if (updateData?.createComment?.__typename === 'ErrorResponse') {
          Alert.alert(
            'Aconteceu um error',
            `${updateData.createComment.error.message}`,
          );
        }
      },
    });
  };
  // End handlers

  return (
    <Container safe light center={false}>
      <CommentsContainer>
        <CommentsContent>
          <CommentListSection
            post={{
              ...post,
            }}
            myCommentsCount={countComments}
            newComment={newComment}
          />
        </CommentsContent>
        <GuupFooter color="ligth">
          <CommentsActions>
            <Link onPress={() => toggleComment()} color="primary">
              Faça um comentario
            </Link>
          </CommentsActions>
        </GuupFooter>
      </CommentsContainer>
      <CreateComment
        show={createComment}
        loading={loading}
        toggleModal={toggleComment}
        onSendMessage={(message: string) => sendComment(message)}
      />
    </Container>
  );
};

export default CommentsScreen;
