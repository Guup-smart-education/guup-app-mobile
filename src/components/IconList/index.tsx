import React from 'react';
import {
  IconListContainer,
  IconListItem,
  IconListIcon,
  IconListContent,
} from './_styled';
import {IconsList} from './../../@types/icons.list';
import {Text, Icon} from './../../ui';
import {GetUniqueId} from './../../helper';

type IProps = {
  readonly list: Array<IconsList>;
};

export default ({list}: IProps) => {
  return (
    <IconListContainer>
      {list.map((item) => (
        <IconListItem key={`guup-list-item-${GetUniqueId()}`}>
          <IconListIcon>
            <Icon source={item.icon} />
          </IconListIcon>
          <IconListContent>
            <Text preset="tall" color="darkGrey">
              {item.text}
            </Text>
          </IconListContent>
        </IconListItem>
      ))}
    </IconListContainer>
  );
};
