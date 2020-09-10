import React from 'react';
import {Action, Text} from '../../ui';
import {Avatar} from '../../components';
import {
  CreatePostContainer,
  CreatePostAvatar,
  CreatePostInput,
  CreatePostInputComponent,
} from './_styled';
import {Alert} from 'react-native';

const INPUT_PLACEHOLDER = 'Inicie uma discussão';

export default () => {
  return (
    <CreatePostContainer>
      <CreatePostAvatar>
        <Avatar size="small" />
      </CreatePostAvatar>
      <Action
        onPress={() => Alert.alert('Create post', 'Ínsert navigation her')}>
        <CreatePostInput>
          <CreatePostInputComponent>
            <Text preset="comment" bold color="ligthGrey">
              {INPUT_PLACEHOLDER}
            </Text>
          </CreatePostInputComponent>
        </CreatePostInput>
      </Action>
    </CreatePostContainer>
  );
};
