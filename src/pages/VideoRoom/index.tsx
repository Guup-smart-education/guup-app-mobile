import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {
  Icon,
  Action,
  Container,
  Text,
  RowFullWidth,
  Separator,
  Link,
  FooterPatch,
} from './../../ui';
import {VideoPlayer, GuupHeader, GuupShowMore} from './../../components';
import {
  VideoRoomContainer,
  VideoRoomHeader,
  VideoRoomBody,
  VideoRoomFooter,
} from './_styled';
import {PropsApp} from './../../@types/app.navigation';
import {usePathContext} from './../../contexts/path';
import {Alert} from 'react-native';

const VideoRoom: React.FC<PropsApp> = ({navigation: {goBack}}) => {
  const {
    state: {currentCourse},
    dispatch,
  } = usePathContext();
  const onBuffer = (buffer) => {
    console.log('buffer => ', buffer);
  };
  console.log('currentCourse: ', currentCourse);
  return (
    <Container safe dark>
      <VideoRoomContainer>
        <VideoRoomHeader>
          <GuupHeader
            hasBack
            isDarkTheme
            onLeftPress={() => goBack()}
            // leftRenderIntem={
            //   <Action onPress={() => goBack()}>
            //     <Icon source="arrow" tintColor="ligth" size="normal" />
            //   </Action>
            // }
          />
        </VideoRoomHeader>
        <VideoRoomBody>
          <View style={{width: '75%'}}>
            <Text preset="subtitle" color="ligth">
              {currentCourse?.title}
            </Text>
          </View>
          <Separator size="small" />
          <GuupShowMore
            preset="comment"
            color="ligth"
            text={currentCourse?.description || ''}
          />
          {/* <Text preset="comment" color="ligth" maxLength={250}>
            {currentCourse?.description}
          </Text> */}
          <Separator size="small" />
        </VideoRoomBody>
        {/* <VideoRoomFooter>
          <Action onPress={() => Alert.alert('Video', 'Play video')}>
            <Icon source="video" tintColor="contrast" size="large" />
          </Action>
        </VideoRoomFooter> */}
        {/* <FooterPatch /> */}
      </VideoRoomContainer>
      <VideoPlayer
        onBuffer={onBuffer}
        resizeMode="cover"
        source={{
          uri: `https://stream.mux.com/${currentCourse?.videoPlaybackID}.m3u8`,
        }}
        onVideoLoad={() => console.log('video loading')}
      />
    </Container>
  );
};

export default VideoRoom;
