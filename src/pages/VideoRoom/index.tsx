import React, {useState, useEffect} from 'react';
import {VideoPlayer} from './../../components';
import {VideoRoomContainer} from './_styled';

export default () => {
  const onBuffer = (buffer) => {
    console.log('buffer => ', buffer);
  };
  return (
    <VideoRoomContainer>
      <VideoPlayer
        muted={true}
        onBuffer={onBuffer}
        source={require('../../../assets/videos/video_horizontal.mp4')}
      />
    </VideoRoomContainer>
  );
};
