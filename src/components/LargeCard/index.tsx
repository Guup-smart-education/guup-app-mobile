import React from 'react';
import {ImageProps, TouchableWithoutFeedback} from 'react-native';
import {CardContainer, CardSectionBottom, CardSectionTop, CardTouchArea} from './_styled';
import {Text, Icon, Separator, Score} from './../../ui';

export interface Props extends ImageProps {
  readonly image?: Blob;
  readonly imageUri?: string;
  readonly title?: string;
  readonly description?: string;
  readonly rating?: string;
  readonly onPress?: () => void | undefined;
}

const GuupBot: React.FC<Props> = ({
  source,
  image,
  imageUri,
  title,
  description,
  rating,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <CardTouchArea>
        <CardContainer
          source={{
            uri: imageUri,
          }}>
          <CardSectionTop>
            <Icon source="heart" />
            <Separator size="lili" />
            <Score score="4.6" secondColor="ligthGrey" />
          </CardSectionTop>
          <CardSectionBottom>
            <Text preset="title" color="ligth">
              {title}
            </Text>
            <Separator size="lili" />
            <Text preset="paragraph" bold color="ligth">
              {description}
            </Text>
          </CardSectionBottom>
        </CardContainer>
      </CardTouchArea>
    </TouchableWithoutFeedback>
  );
};

export default GuupBot;
