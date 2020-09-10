import React from 'react';
import {
  DotListContainer,
  DotListItem,
  DotListDot,
  DotListContent,
} from './_styled';
import {DotList} from './../../@types/dotlist';
import {Text} from './../../ui';
import {GetUniqueId} from './../../helper';

type IProps = {
  readonly list: Array<DotList>;
};

export default ({list}: IProps) => {
  return (
    <DotListContainer>
      {list.map((item) => (
        <DotListItem key={`guup-list-item-${GetUniqueId()}`}>
          <DotListDot />
          <DotListContent>
            <Text preset="comment">{item.text}</Text>
          </DotListContent>
        </DotListItem>
      ))}
    </DotListContainer>
  );
};
