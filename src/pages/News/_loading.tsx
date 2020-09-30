/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import HeaderSkeleton from './../../components/Header/_skeleton';
import PostSkeleton from './../../components/PostComment/_skeleton';
import Skeleton from 'react-native-skeleton-placeholder';
import {ScrollView, View} from 'react-native';
import {Container} from './../../ui';
import {GetUniqueId} from './../../helper';

export default () => {
  return (
    <Container safe>
      <ScrollView
        style={{width: '100%', paddingHorizontal: 25}}
        scrollEnabled={false}>
        <HeaderSkeleton />
        <Skeleton>
          <View style={{width: '100%', marginBottom: 20}}>
            <View style={{height: 18, width: '45%', marginBottom: 8}} />
            <View style={{height: 18, width: '48%', marginBottom: 8}} />
            <View style={{height: 18, width: '20%', marginBottom: 8}} />
          </View>
        </Skeleton>
        {Array(3)
          .fill('')
          .map(() => (
            <PostSkeleton key={`loading-card-post-${GetUniqueId()}`} />
          ))}
      </ScrollView>
    </Container>
  );
};
