import React from 'react';
import {View} from 'react-native';
import Skeleton from 'react-native-skeleton-placeholder';

export default () => {
  return (
    <Skeleton>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 20,
          paddingVertical: 10,
        }}>
        <View style={{height: 36, width: 36, borderRadius: 18}} />
        <View style={{width: 120, height: 14}} />
      </View>
    </Skeleton>
  );
};
