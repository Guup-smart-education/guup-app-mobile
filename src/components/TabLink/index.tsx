import React from 'react';
import {Text} from './../../ui';
import {TabLinkContainer, TabLinkItem, TabLinkTouch} from './_styled';
import {ETabLinks} from './../../@types/tablink';

export type EProps = {
  readonly links: Array<ETabLinks>;
  readonly active: ETabLinks;
  readonly onPress: (link: ETabLinks) => void;
};

const LINKS = [{label: 'Nada para mostrar'}] as Array<ETabLinks>;

export default ({links = LINKS, onPress, active}: EProps) => {
  return (
    <TabLinkContainer>
      {links.map((link) => (
        <TabLinkItem key={link.id}>
          <TabLinkTouch onPress={() => onPress(link)}>
            <Text
              bold
              color={active.id === link.id ? 'primary' : 'ligthGrey'}
              underline={active.id === link.id}>
              {link.label}
            </Text>
          </TabLinkTouch>
        </TabLinkItem>
      ))}
    </TabLinkContainer>
  );
};
