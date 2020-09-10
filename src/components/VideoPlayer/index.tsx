import React from 'react';
import {StyleSheet} from 'react-native';
import VideoPlayer, {VideoProperties} from 'react-native-video';

// interface IProps extends VideoProperties;

export default (props: VideoProperties) => {
  return (
    <VideoPlayer
      {...props}
      resizeMode="cover"
      style={StyleSheet.absoluteFill}
    />
  );
};
