import React from 'react';
import {Container, Text, Icon, Action} from './../../ui';
import {GuupHeader} from './../../components';
import {EditContainer, EditHeader, EditBody} from './_styled';
import {EditCollectionPropsApp} from './../../@types/app.navigation';

const GuupPosts: React.FC<EditCollectionPropsApp> = ({
  navigation: {goBack},
  route: {
    params: {id},
  },
}) => {
  return (
    <Container safe>
      <EditContainer>
        <EditHeader>
          <GuupHeader
            leftRenderIntem={
              <Action onPress={() => goBack()}>
                <Icon source="arrow" />
              </Action>
            }
          />
        </EditHeader>
        <EditBody>
          <Text>Post ID: {id}</Text>
        </EditBody>
      </EditContainer>
    </Container>
  );
};

export default GuupPosts;
