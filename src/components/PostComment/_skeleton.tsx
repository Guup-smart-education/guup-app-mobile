import React from 'react';
import {View} from 'react-native';
import Skeleton from 'react-native-skeleton-placeholder';

export default () => {
  return (
    <Skeleton>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 17,
          paddingVertical: 20,
          borderRadius: 8,
          marginBottom: 30,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{height: 48, width: 48, borderRadius: 24, marginRight: 15}}
          />
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
            }}>
            <View style={{height: 14, width: '80%', marginBottom: 8}} />
            <View style={{height: 14, width: '60%'}} />
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <View style={{height: 14, width: '100%', marginBottom: 8}} />
          <View style={{height: 14, width: '100%', marginBottom: 8}} />
          <View style={{height: 14, width: '100%', marginBottom: 8}} />
          <View style={{height: 14, width: '55%', marginBottom: 8}} />
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{height: 14, width: 60}} />
          <View style={{height: 22, width: 22}} />
        </View>
      </View>
    </Skeleton>
  );
};
