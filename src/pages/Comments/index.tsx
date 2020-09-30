/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useState, useEffect, useCallback} from 'react';
import {Text, Link, Separator, Action, Icon, Container} from './../../ui';
import {GetUniqueId} from './../../helper';
import {
  PostComment,
  CreateComment,
  GuupComment,
  GuupHeader,
} from './../../components';
import {CommentPropsApp} from './../../@types/app.navigation';
import {
  CommentsContainer,
  CommentsDetailContainer,
  CommentsDetail,
  CommentsContent,
  CommentsActions,
  FooterContainer,
  CommentsEmpty,
  CommentsList,
  CommentListItem,
  CommentNav,
} from './_styled';
import {
  Comments,
  useGetCommentByPostLazyQuery,
  useCreateCommentMutation,
  GetCommentByPostDocument,
  CommentFor,
  Post,
} from './../../graphql/types.d';
import {FlatList, ActivityIndicator, Alert} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {CommentScreenNavigationProp} from './../../@types/app.navigation';

// List component
const CommentListSection: React.FC<{
  post: Post;
  newComment?: Comments;
  myCommentsCount: number;
}> = ({post, newComment, myCommentsCount}) => {
  // const navigation = useNavigation<CommentScreenNavigationProp>();
  const [comments, setComments] = useState<Array<Comments>>([]);
  const [
    getAllComments,
    {data, loading, error, refetch, client},
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

  // useEffect(() => {
  //   refetch && refetch();
  // }, [refetch]);

  // useEffect(() => {
  //   if (client) {
  //     client.readQuery({query: GetCommentByPostDocument});
  //   }
  // }, [client]);

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
      setComments(formatComments);
    }
  }, [data]);

  useEffect(() => {
    if (newComment && !R.find(R.eqProps('id', newComment.id))(comments)) {
      setComments([{...newComment}, ...comments]);
    }
  }, [newComment]);
  // End effects

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
        {/* <CommentNav>
          <GuupHeader
            leftRenderIntem={
              <Action onPress={() => navigation.goBack()}>
                <Icon source="arrow" />
              </Action>
            }
          />
        </CommentNav> */}
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
      <FlatList
        data={comments}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={CommentItem}
        ListHeaderComponent={CommentDetail}
        ListFooterComponent={<Separator size="large" />}
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
    <Container center={false}>
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
        <FooterContainer>
          <CommentsActions>
            <Link onPress={() => toggleComment()} color="contrast">
              Faça um comentario
            </Link>
          </CommentsActions>
        </FooterContainer>
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
