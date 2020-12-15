/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import VideoPlayer, {
  VideoProperties,
  OnLoadData,
  OnBufferData,
  LoadError,
  OnProgressData,
} from 'react-native-video';
import {ActivityIndicator} from './../../ui';
import {VideoLoading} from './_styled';

interface IProps extends VideoProperties {
  readonly videoIsLoading?: any;
  readonly videoIsPlaying?: any;
  readonly videoPoster?: string;
}

export default (props: IProps) => {
  const {
    onEnd,
    onError,
    onLoad,
    onReadyForDisplay,
    onBuffer,
    videoIsLoading,
    videoIsPlaying,
    videoPoster,
    ...args
  } = props;
  const [loading, setLoading] = useState(true);
  const [readyForDisplay, setReadyForDisplay] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [videoData, setVideoData] = useState<OnLoadData>();
  const [videoProgressData, setVideoProgressData] = useState<OnProgressData>();
  const [videoOrientation, setVideoOrientation] = useState<string>();
  const videoRef = useRef<VideoPlayer>(null);
  // Video Events
  const onVideoBuffer = (buffer: OnBufferData) => {
    onBuffer && onBuffer(buffer);
  };
  const onVideoError = (error: LoadError) => {
    onError && onError(error);
  };
  const onVideoLoad = (data: OnLoadData) => {
    onLoad && onLoad(data);
    setVideoData(data);
  };
  const onVideoReadyForDisplay = () => {
    onReadyForDisplay && onReadyForDisplay();
    setReadyForDisplay(true);
  };
  const onVideoEnd = () => {
    setVideoProgressData(undefined);
    onEnd && onEnd();
  };
  const onVideoIsPlaying = (data: OnProgressData) => {
    if (!videoProgressData && data.currentTime > 0.5) {
      console.log('onVideoIsPlaying: ', data);
      setVideoProgressData(data);
    }
  };
  // Effects
  useEffect(() => {
    if (readyForDisplay && videoData) {
      setReadyToPlay(true);
      setVideoOrientation(videoData.naturalSize.orientation);
      setLoading(false);
    }
  }, [videoData, readyForDisplay]);
  useEffect(() => {
    videoIsLoading && videoIsLoading(loading);
  }, [loading]);
  useEffect(() => {
    videoIsPlaying && videoIsPlaying(!!videoProgressData);
  }, [videoProgressData]);
  return (
    <>
      <VideoPlayer
        // Configs
        ref={videoRef}
        playInBackground
        paused={!readyToPlay}
        style={StyleSheet.absoluteFill}
        volume={1.0}
        rate={1.0}
        ignoreSilentSwitch="ignore"
        pictureInPicture
        renderToHardwareTextureAndroid
        posterResizeMode="cover"
        poster={videoPoster}
        // Events
        onBuffer={onVideoBuffer}
        onError={onVideoError}
        onReadyForDisplay={onVideoReadyForDisplay}
        onEnd={onVideoEnd}
        onLoad={onVideoLoad}
        onProgress={onVideoIsPlaying}
        // resizeMode={videoOrientation === 'portrait' ? 'cover' : 'none'}
        {...args}
      />
      {loading && (
        <VideoLoading style={StyleSheet.absoluteFill}>
          <ActivityIndicator color="contrast" size="small" />
        </VideoLoading>
      )}
    </>
  );
};
