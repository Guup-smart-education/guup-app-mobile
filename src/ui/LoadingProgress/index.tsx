import React from 'react';
import {ProgressContainer} from './_styled';
import Text from './../Text';

interface IProps {
  readonly progress: string;
}

const LoadingProgress: React.FC<IProps> = ({progress = '0'}) => {
  return (
    <ProgressContainer>
      <Text bold color="dark">
        {progress}% progresso...
      </Text>
    </ProgressContainer>
  );
};

export default LoadingProgress;
