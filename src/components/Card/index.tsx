import React from 'react';
import {Text, Separator, Icon} from './../../ui';
import {CardContainer, CardLeftSection, CardRightSection} from './_styled';

interface ICard {
  readonly icon?: string;
  readonly image?: string;
  readonly title: string;
  readonly description: string;
}

const GuupCard = ({image, title, description}: ICard) => {
  return (
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
  );
};

export default GuupCard;
