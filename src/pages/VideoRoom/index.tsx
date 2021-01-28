import React, {useState, useEffect, useRef} from 'react';
import {TouchableWithoutFeedback, Animated} from 'react-native';
// import Animated, {Easing} from 'react-native-reanimated';
import {Icon, Action, Container, Text, Separator} from './../../ui';
import {VideoPlayer, GuupHeader, GuupShowMore} from './../../components';
import {
  VideoRoomContainer,
  VideoRoomHeader,
  VideoRoomBody,
  VideoRoomBodyTop,
  VideoRoomBodyBottom,
  VideoRoomFooter,
  VideoTitleContainer,
  VideoTitle,
} from './_styled';
import {PropsApp} from './../../@types/app.navigation';
import {usePathContext} from './../../contexts/path';
import {buildMxVideoUrl} from './../../utils/mux';

const VideoRoom: React.FC<PropsApp> = ({navigation: {goBack}}) => {
  // Animation
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const fadeInAnimation = () => {
    console.log('fadeInAnimation');
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };
  const fadeOutAnimation = () => {
    console.log('fadeOutAnimation');
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };
  // End Animation
  const {
    state: {currentCourse},
  } = usePathContext();
  const [videoIsLoading, setVideoIsLoading] = useState<boolean>(false);
  const [videoIsPlaying, setVideoIsPlaying] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [videoUrl, seetVideoUrl] = useState<string>();
  useEffect(() => {
    if (currentCourse) {
      const mxUrl = buildMxVideoUrl(`${currentCourse.videoPlaybackID}`);
      mxUrl && seetVideoUrl(mxUrl);
    }
  }, [currentCourse]);
  // Handlers
  const startVideo = () => {
    setPaused(!paused);
    setVideoIsPlaying(!videoIsPlaying);
    // fadeOutAnimation();
  };
  const onEnd = () => {
    setPaused(true);
    setIsEnded(true);
  };
  // useEffect(() => {
  //   videoIsPlaying && fadeOutAnimation();
  // }, [videoIsPlaying]);
  useEffect(() => {
    isEnded && setIsEnded(false) && fadeInAnimation();
  }, [isEnded]);
  useEffect(() => {
    paused ? fadeInAnimation() : fadeOutAnimation();
  }, [paused]);
  return (
    <Container safe dark>
      <VideoRoomContainer
        as={Animated.View}
        style={[
          {
            opacity: fadeAnimation,
          },
        ]}>
        <VideoRoomHeader>
          <GuupHeader
            leftRenderIntem={
              <Action onPress={() => goBack()}>
                <Icon burble back source="back" size="small" tintColor="dark" />
              </Action>
            }
            isDarkTheme
          />
        </VideoRoomHeader>
        {(!videoIsLoading || isEnded) && (
          <>
            <TouchableWithoutFeedback onPress={startVideo}>
              <VideoRoomBody>
                <VideoRoomBodyTop>
                  <Separator size="small" />
                  <VideoTitleContainer>
                    <VideoTitle>
                      <Text preset="title" color="ligth">
                        {currentCourse?.title}
                      </Text>
                    </VideoTitle>
                  </VideoTitleContainer>
                  <Separator size="small" />
                </VideoRoomBodyTop>
                <VideoRoomBodyBottom>
                  <GuupShowMore
                    preset="paragraph"
                    color="ligth"
                    text={currentCourse?.description || ''}
                  />
                  <Separator size="small" />
                </VideoRoomBodyBottom>
              </VideoRoomBody>
            </TouchableWithoutFeedback>
            <VideoRoomFooter>
              <Action onPress={startVideo}>
                <Icon
                  source={paused ? 'videoPlay' : 'videoPause'}
                  size="xxlarge"
                />
              </Action>
            </VideoRoomFooter>
          </>
        )}
      </VideoRoomContainer>
      {videoUrl && (
        <VideoPlayer
          source={{
            uri: videoUrl,
          }}
          videoIsLoading={setVideoIsLoading}
          videoPoster={`${currentCourse?.photoURL}`}
          onEnd={onEnd}
          repeat
          {...{paused}}
        />
      )}
    </Container>
  );
};

export default VideoRoom;
