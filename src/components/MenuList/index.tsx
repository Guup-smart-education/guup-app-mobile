import R from 'ramda';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Text, Icon} from './../../ui';
import {MenuContainer, MenuListItemcontainer, MenuListText} from './_styled';
import {IMenuItemProps} from './../../@types/menu.item';
import nextId from 'react-id-generator';

interface IMenuProps {
  readonly menuItems?: Array<IMenuItemProps>;
  readonly hideChevron?: boolean;
  readonly compress?: boolean;
  readonly noBorder?: boolean;
  readonly padding?: boolean;
}

const GuupMenuList: React.FC<IMenuProps> = ({
  menuItems = [],
  hideChevron = false,
  compress = false,
  noBorder = false,
  padding = false,
}) => {
  if (R.isEmpty(menuItems)) {
    return (
      <MenuListItemcontainer {...{compress, noBorder, padding}}>
        <Text preset="comment" bold>
          Nāo há nada para mostrar
        </Text>
      </MenuListItemcontainer>
    );
  }
  return (
    <MenuContainer {...{noBorder}}>
      {R.map(
        ({text, onPress, icon}) => (
          <TouchableWithoutFeedback
            onPress={() => onPress && onPress()}
            key={nextId('guup-menu-item-')}>
            <MenuListItemcontainer {...{compress, noBorder, padding}}>
              {icon && (
                <Icon source={icon} size="small" tintColor="greyBrown" />
              )}
              <MenuListText>
                <Text preset="comment" color="ultraDark">
                  {text}
                </Text>
              </MenuListText>
              {!hideChevron && <Icon source="chevronMenu" size="small" />}
            </MenuListItemcontainer>
          </TouchableWithoutFeedback>
        ),
        menuItems,
      )}
    </MenuContainer>
  );
};

export default GuupMenuList;
