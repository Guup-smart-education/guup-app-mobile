/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Dimensions, Text} from 'react-native';
import {ProgressBarContainer, ProgressBar} from './_styled';
import {useAnimatedProgress} from './Hooks';

interface IProgress {
  width?: number;
  progress: number;
}

const Progress: React.FC<IProgress> = ({progress = 0}) => {
  return (
    <ProgressBarContainer>
      <Text>{progress}</Text>
      <ProgressBar style={{width: `${progress}%`}} />
    </ProgressBarContainer>
  );
};

export default Progress;
