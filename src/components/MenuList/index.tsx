import R from 'ramda';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Text, Icon} from './../../ui';
import {MenuContainer, MenuListItemcontainer} from './_styled';
import {IMenuItemProps} from './../../@types/menu.item';
import nextId from 'react-id-generator';

interface IMenuProps {
  readonly menuItems?: Array<IMenuItemProps>;
}

const GuupMenuList: React.FC<IMenuProps> = ({menuItems = []}) => {
  if (R.isEmpty(menuItems)) {
    return (
      <MenuListItemcontainer>
        <Text preset="comment" bold>
          Nāo há nada para mostrar
        </Text>
      </MenuListItemcontainer>
    );
  }
  return (
    <MenuContainer>
      {R.map(
        ({text, onPress}) => (
          <TouchableWithoutFeedback
            onPress={() => onPress && onPress()}
            key={nextId('guup-menu-item-')}>
            <MenuListItemcontainer>
              <Text preset="comment">{text}</Text>
              <Icon source="chevronMenu" size="small" />
            </MenuListItemcontainer>
          </TouchableWithoutFeedback>
        ),
        menuItems,
      )}
    </MenuContainer>
  );
};

export default GuupMenuList;
