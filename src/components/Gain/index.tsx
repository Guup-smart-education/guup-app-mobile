import React from 'react';
import {Text, Separator} from './../../ui';
import {GainContainer, GainImage, GainBody, GainHeader} from './_styled';
import {GainProps} from './../../@types/gain.content';

export default ({gainIcon, gainTitle, gainDescription}: GainProps) => {
  return (
    <GainContainer>
      <GainHeader>{gainIcon && <GainImage />}</GainHeader>
      <GainBody>
        <Text bold>{gainTitle}</Text>
        <Separator size="lili" />
        <Text preset="comment">{gainDescription}</Text>
      </GainBody>
    </GainContainer>
  );
};
