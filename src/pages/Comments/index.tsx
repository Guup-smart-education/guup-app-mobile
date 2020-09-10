import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Text, Link} from './../../ui';
import {GetUniqueId} from './../../helper';
import {PostComment} from './../../components';
import {PropsApp} from './../../@types/app.navigation';
import {PostProps} from './../../@types/post.comment';
import {
  CommentsContainer,
  CommentsDetailContainer,
  CommentsDetail,
  CommentsContent,
  CommentsActions,
  CommentsList,
  FooterContainer,
  CommentsEmpty,
} from './_styled';
import CreateComment from './Create';

const CommentsScreen: React.FC<PropsApp> = () => {
  const [createComment, showCreateComment] = useState(false);
  const toggleComment = () => {
    showCreateComment(!createComment);
  };
  const post: PostProps = {
    id: GetUniqueId(),
    owner: {
      ownerName: 'Marcos Rodriguez',
      ownerProsiffion: 'Javascript ENginner at Vivo',
    },
    menu: true,
    showComments: true,
    comments: 15,
    postComment:
      'Earlier this year, I decided that I was burned out in my current career as a tissue bank specialist (yes, it pays well... but the joke "I see dead people" is only clever the first 100 times you hear it).',
  };
  return (
    <CommentsContainer>
      <CommentsDetailContainer>
        <CommentsDetail focusable={false} scrollEnabled={false}>
          <PostComment {...post} navigateComments={false} />
        </CommentsDetail>
      </CommentsDetailContainer>
      <CommentsContent>
        <CommentsEmpty>
          <Text>Ainda não há commentarios</Text>
        </CommentsEmpty>
      </CommentsContent>
      <FooterContainer>
        <CommentsActions>
          <Link onPress={() => toggleComment()} color="ligth">
            Faça um comentario
          </Link>
        </CommentsActions>
      </FooterContainer>
      <CreateComment show={createComment} toggleModal={toggleComment} />
    </CommentsContainer>
  );
};

export default CommentsScreen;
