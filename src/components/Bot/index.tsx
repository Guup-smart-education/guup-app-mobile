import React from 'react';
import {BotContainer, BotImage, BotMessage} from './_styled';
import {Text, Separator} from './../../ui';

export type Props = {
  readonly image?: Blob;
  readonly message?: string;
};

const GuupBot: React.FC<Props> = ({image, message}) => {
  return (
    <BotContainer>
      <BotImage source={image} />
      <Separator size="extraLarge" />
      <BotMessage>
        <Text preset="chat" center>
          {message}
        </Text>
      </BotMessage>
    </BotContainer>
  );
};

export default GuupBot;
