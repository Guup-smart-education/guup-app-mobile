import React from 'react';
import {Container, Text, Link, Separator} from './../../ui';
import {WaitingImage, WaitingContent, WaitinWrapper} from './_styled';
import {PropsAuth} from './../../@types/auth.navigation';

const Waiting: React.FC<PropsAuth> = ({
  navigation,
  route: {
    params: {title, description, image, actionBack},
  },
}) => {
  return (
    <Container dark>
      <WaitinWrapper>
        <WaitingImage source={image} />
        <WaitingContent>
          <Text center color="primary" preset="title">
            {title}
          </Text>
          <Separator size="extraLarge" />
          <Text center color="ligth" preset="paragraph">
            {description}
          </Text>
        </WaitingContent>
        <Link
          onPress={() => (actionBack && actionBack()) || navigation.popToTop()}
          color="ligth">
          voltar
        </Link>
      </WaitinWrapper>
    </Container>
  );
};

export default Waiting;
