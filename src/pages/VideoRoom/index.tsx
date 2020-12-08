import React, {useState, useEffect, useRef} from 'react';
import {TouchableWithoutFeedback, Animated} from 'react-native';
// import Animated, {Easing} from 'react-native-reanimated';
import {Icon, Action, Container, Text, Separator} from './../../ui';
import {VideoPlayer, GuupHeader, GuupShowMore} from './../../components';
import {
  VideoRoomContainer,
  VideoRoomHeader,
  VideoRoomBody,
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
          <GuupHeader hasBack isDarkTheme onLeftPress={() => goBack()} />
        </VideoRoomHeader>
        {(!videoIsLoading || isEnded) && (
          <>
            <TouchableWithoutFeedback onPress={startVideo}>
              <VideoRoomBody>
                <Separator size="small" />
                <VideoTitleContainer>
                  <VideoTitle>
                    <Text preset="header" color="ligth">
                      {/* {currentCourse?.title} */}
                      Some title for a video you can like
                    </Text>
                  </VideoTitle>
                </VideoTitleContainer>
                <Separator size="small" />
                <GuupShowMore
                  preset="paragraph"
                  color="ligth"
                  text="Maybe its something you would like, and i can give you"
                  // text={currentCourse?.description || ''}
                />
                <Separator size="small" />
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
          resizeMode="cover"
          source={{
            uri: videoUrl,
          }}
          videoIsLoading={setVideoIsLoading}
          // videoIsPlaying={setVideoIsPlaying}
          onEnd={onEnd}
          repeat
          {...{paused}}
        />
      )}
    </Container>
  );
};

export default VideoRoom;
