import React from 'react';
import {Text} from './../../../ui';
import {ClassRoomTabEmpty, ClassRoomTabEmptyText} from './../_styled';

const EMPTY_TEXT = 'Ainda você não tem atividdes e/ou projetos publicados';

export default () => {
  return (
    <ClassRoomTabEmpty>
      <ClassRoomTabEmptyText>
        <Text preset="tall" color="greyBrown" center>
          {EMPTY_TEXT}
        </Text>
      </ClassRoomTabEmptyText>
    </ClassRoomTabEmpty>
  );
};
