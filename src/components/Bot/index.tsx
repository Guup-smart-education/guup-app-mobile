import React from 'react';
import {BotContainer, BotImage, BotMessage} from './_styled';
import {Text, Separator} from './../../ui';

export type Props = {
  readonly image?: Blob;
  readonly message?: string;
  readonly error?: boolean;
};

const GuupBot: React.FC<Props> = ({image, message, error}) => {
  return (
    <BotContainer>
      <BotImage source={image} {...{error}} />
      <Separator size="large" />
      <BotMessage>
        <Text preset="chat" center>
          {message}
        </Text>
      </BotMessage>
    </BotContainer>
  );
};

export default GuupBot;
