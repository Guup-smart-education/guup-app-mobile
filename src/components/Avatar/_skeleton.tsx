import React from 'react';
import Skeleton from 'react-native-skeleton-placeholder';
import {View} from 'react-native';

export default () => {
  return (
    <Skeleton>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{height: 48, width: 48, borderRadius: 24, marginRight: 15}}
        />
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
          }}>
          <View style={{height: 14, width: '80%', marginBottom: 12}} />
          <View style={{height: 14, width: '60%'}} />
        </View>
      </View>
    </Skeleton>
  );
};
