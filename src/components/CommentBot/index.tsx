import React from 'react';
import {Separator, Text, Icon} from './../../ui';
import {CreateCommentBot} from './_styled';

type IProps = {
  readonly withIcon?: boolean;
  readonly text: string;
};

export default ({withIcon, text}: IProps) => {
  return (
    <CreateCommentBot>
      {withIcon && (
        <>
          <Icon source="guup" />
          <Separator size="small" />
        </>
      )}
      <Text center preset="comment" bold>
        {text}
      </Text>
    </CreateCommentBot>
  );
};
