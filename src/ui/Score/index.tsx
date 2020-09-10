import React from 'react';
import {ScoreContainer} from './_styled';
import {Text} from './../../ui';
import {EColors} from './../../@enum/color.enum';

export type Props = {
  readonly score: string;
  readonly label?: string;
  readonly firstColor?: keyof typeof EColors;
  readonly secondColor?: keyof typeof EColors;
};

const Score: React.FC<Props> = ({
  score = '0.0',
  label = 'Score',
  firstColor = EColors.ligth,
  secondColor = EColors.ligth,
}) => {
  return (
    <ScoreContainer>
      <Text center preset="paragraph" bold color={firstColor}>
        {score}
      </Text>
      <Text center preset="tiny" bold color={secondColor}>
        {label}
      </Text>
    </ScoreContainer>
  );
};

export default Score;
