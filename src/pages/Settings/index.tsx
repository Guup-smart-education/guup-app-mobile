import React from 'react';
import {Container, Text, Icon, Action} from './../../ui';
import {GuupHeader} from './../../components';
import {PostsContainer, PostsHeader, PostsBody} from './_styled';
import {PropsApp} from './../../@types/app.navigation';

const GuupSettings: React.FC<PropsApp> = ({navigation: {goBack}}) => {
  return (
    <Container safe>
      <PostsContainer>
        <PostsHeader>
          <GuupHeader
            leftRenderIntem={
              <Action onPress={() => goBack()}>
                <Icon source="arrow" />
              </Action>
            }
          />
        </PostsHeader>
        <PostsBody>
          <Text>Settings</Text>
        </PostsBody>
      </PostsContainer>
    </Container>
  );
};

export default GuupSettings;
