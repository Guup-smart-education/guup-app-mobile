import React, {useState} from 'react';
import {Alert, StyleSheet, ActivityIndicator} from 'react-native';
import VideoPlayer, {VideoProperties, OnLoadData} from 'react-native-video';
import {VideoLoading} from './_styled';

// interface IProps extends VideoProperties;

export default (props: VideoProperties) => {
  const [loading, setLoading] = useState(true);
  const onLoadStart = (data) => {
    console.log('onLoadStart: ', data);
  };
  const onVideoLoadStart = (data) => {
    console.log('onLoadStart: ', data);
  };
  const onVideoEnd = (data) => {
    console.log('onVideoEnd: ', data);
  };
  const onVideoProgress = (data) => {
    console.log('onVideoProgress: ', data);
  };
  const onVideoSeek = (data) => {
    console.log('onVideoSeek: ', data);
  };
  const onReadyForDisplay = (data) => {
    console.log('onReadyForDisplay: ', data);
  };
  const onVideoError = (error) => {
    console.log('onVideoError: ', error);
  };
  const onVideoLoad = (load) => {
    console.log('onVideoLoad: ', load);
  };
  return (
    <>
      <VideoPlayer
        muted={false}
        style={StyleSheet.absoluteFill}
        // onLoadStart={onLoadStart}
        // onVideoLoadStart={onVideoLoadStart}
        // onVideoError={onVideoError}
        // onVideoProgress={onVideoProgress}
        // onVideoEnd={onVideoEnd}
        // onReadyForDisplay={onReadyForDisplay}
        // onVideoSeek={onVideoSeek}
        // onVideoLoad={onVideoLoad}
        {...props}
      />
    </>
  );
};
