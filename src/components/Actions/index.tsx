import React from 'react';
import {Actions} from './_styled';
import {Link} from './../../ui';

type Props = {
  readonly loading: boolean;
  readonly leftAction: {
    text: string;
    onPress: () => void;
    disable?: boolean;
  };
  readonly rightAction: {
    text: string;
    onPress: () => void;
    disable?: boolean;
  };
  readonly noPadding?: boolean;
};

const GuupActions: React.FC<Props> = ({
  leftAction,
  rightAction,
  loading,
  noPadding,
}) => {
  return (
    <Actions {...{noPadding}}>
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
