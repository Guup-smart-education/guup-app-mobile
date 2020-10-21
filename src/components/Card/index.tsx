import React from 'react';
import {Alert} from 'react-native';
import {Text, Separator, Icon, Action} from './../../ui';
import {CardContainer, CardLeftSection, CardRightSection} from './_styled';

interface ICard {
  readonly icon?: string;
  readonly image?: string;
  readonly title: string;
  readonly description: string;
  readonly onPress: () => void;
}

const GuupCard = ({image, title, description, onPress}: ICard) => {
  return (
    <Action onPress={onPress}>
      <CardContainer>
        <CardLeftSection>
          <Icon source="guup" />
        </CardLeftSection>
        <CardRightSection>
          <Text bold>{title}</Text>
          <Separator size="tiny" />
          <Text preset="label" color="greyBrown">
            {description}
          </Text>
        </CardRightSection>
      </CardContainer>
    </Action>
  );
};

export default GuupCard;
