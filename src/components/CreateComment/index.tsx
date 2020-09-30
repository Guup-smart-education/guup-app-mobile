import React, {useState} from 'react';
import {InputArea} from './../../ui';
import {Modal, GuupActions, KeyboardBlock, CommentBot} from './../';
import {
  CreateCommentContainer,
  CreateCommentInputArea,
  CreateCommentFooter,
} from './_styled';

type CreatePost = {
  readonly bootMessage?: string;
  readonly inputPlaceholder?: string;
  readonly show: boolean;
  readonly toggleModal: () => void;
  readonly onSendMessage: (comment: string) => void;
  readonly loading?: boolean;
};

export default ({
  show,
  toggleModal,
  bootMessage,
  inputPlaceholder,
  onSendMessage,
  loading = false,
}: CreatePost) => {
  const [comment, setComment] = useState<string>('');
  return (
    <Modal visible={show} presentationStyle="pageSheet">
      <CreateCommentContainer>
        <CommentBot
          withIcon
          text={
            bootMessage ||
            'Lembra que qualquer ajuda é boa, você aprende, todos aprendemos'
          }
        />
        <KeyboardBlock paddingPageSheet>
          <CreateCommentInputArea>
            <InputArea
              autoFocus
              name="createComment"
              onChangeText={(val: string) => setComment(val)}
              placeholder={inputPlaceholder || 'Digite alguma coisa aqui'}
            />
          </CreateCommentInputArea>
          <CreateCommentFooter>
            <GuupActions
              loading={loading}
              rightAction={{
                text: 'Enviar',
                onPress: () => onSendMessage(comment),
                disable: !comment,
              }}
              leftAction={{text: 'Fechar', onPress: () => toggleModal()}}
            />
          </CreateCommentFooter>
        </KeyboardBlock>
      </CreateCommentContainer>
    </Modal>
  );
};
