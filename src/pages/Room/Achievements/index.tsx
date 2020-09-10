import React from 'react';
import {Text} from './../../../ui';
import {ClassRoomTabEmpty, ClassRoomTabEmptyText} from './../_styled';

const EMPTY_TEXT = 'Nehuma conquista concluida até o momento';

export default () => {
  return (
    <ClassRoomTabEmpty>
      <ClassRoomTabEmptyText>
        <Text preset="tall" color="greyBrown" center>{EMPTY_TEXT}</Text>
      </ClassRoomTabEmptyText>
    </ClassRoomTabEmpty>
  );
};
