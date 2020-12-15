import React from 'react';
import {TabsContainer, TabItem} from './_styled';
import Text from './../Text';
import Action from './../Action';
import nextId from 'react-id-generator';

export interface IProps {
  readonly items: Array<{label: string; key: string}>;
  readonly onTabPress: (key: string) => void;
  readonly active?: string;
  readonly dark?: boolean;
}

const GuupTabs: React.FC<IProps> = ({items, onTabPress, active, dark}) =>
  !items ? (
    <></>
  ) : (
    <TabsContainer {...{dark}}>
      {items.map(({label, key}) => (
        <Action onPress={() => onTabPress(key)} key={nextId('tab-guup-')}>
          <TabItem active={key === active}>
            <Text color={key === active || dark ? 'dark' : 'ligth'} bold>
              {label}
            </Text>
          </TabItem>
        </Action>
      ))}
    </TabsContainer>
  );

export default GuupTabs;
