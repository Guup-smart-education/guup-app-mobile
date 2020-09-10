import React from 'react';
import {Text, Icon, Separator, InputArea} from './../../../ui';
import {
  Modal,
  GuupActions,
  KeyboardBlock,
  CommentBot,
} from './../../../components';
import {
  CreateCommentContainer,
  CreateCommentInputArea,
  CreateCommentFooter,
} from './_styled';
import {Alert} from 'react-native';

type CreatePost = {
  readonly show: boolean;
  readonly toggleModal: () => void;
};

export default ({show, toggleModal}: CreatePost) => {
  return (
    <Modal visible={show} presentationStyle="pageSheet">
      <CreateCommentContainer>
        <CommentBot
          withIcon
          text="Lembra que qualquer ajuda é boa, você aprende, todos aprendemos"
        />
        <KeyboardBlock paddingPageSheet>
          <CreateCommentInputArea>
            <InputArea
              autoFocus
              error={false}
              name="createComment"
              placeholder="Digite seu comentario aqui"
            />
          </CreateCommentInputArea>
          <CreateCommentFooter>
            <GuupActions
              loading={false}
              rightAction={{
                text: 'Enviar',
                onPress: () => Alert.alert('Send response'),
              }}
              leftAction={{text: 'Fechar', onPress: () => toggleModal()}}
            />
          </CreateCommentFooter>
        </KeyboardBlock>
      </CreateCommentContainer>
    </Modal>
  );
};
