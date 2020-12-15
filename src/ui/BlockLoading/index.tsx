import React from 'react';
import {StyleSheet} from 'react-native';
import ActivityIndicator from './../ActivityIndicator';
import Text from './../Text';
import {BlockLoadingContainer} from './_styled';

const BlockLoading: React.FC = () => {
  return (
    <BlockLoadingContainer style={StyleSheet.absoluteFill}>
      <ActivityIndicator color="contrast" size="small" />
    </BlockLoadingContainer>
  );
};

export default BlockLoading;
