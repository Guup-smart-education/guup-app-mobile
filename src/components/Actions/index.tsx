import React from 'react';
import {Actions} from './_styled';
import {Link} from './../../ui';

type Props = {
  loading: boolean;
  leftAction: {
    text: string;
    onPress: () => void;
    disable?: boolean;
  };
  rightAction: {
    text: string;
    onPress: () => void;
    disable?: boolean;
  };
};

const GuupActions: React.FC<Props> = ({leftAction, rightAction, loading}) => {
  console.log('guup actions -> ', loading);
  return (
    <Actions>
      <Link
        loading={loading}
        disable={leftAction.disable}
        onPress={() => leftAction.onPress()}>
        {leftAction.text}
      </Link>
      <Link
        loading={loading}
        disable={rightAction.disable}
        preset="solid"
        onPress={() => rightAction.onPress()}>
        {rightAction.text}
      </Link>
    </Actions>
  );
};

export default GuupActions;
