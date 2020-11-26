/* eslint-disable react-hooks/exhaustive-deps */
// import RNFetchBlob from 'rn-fetch-blob';
import React, {useState, forwardRef, ReactElement, useEffect} from 'react';
import {IFileDatUpload} from './../../@types/fileDataUpload';
import {Action, Icon, Text, Separator} from './../../ui';
import ImagePicker, {ImagePickerOptions} from 'react-native-image-picker';
import VideoPlayer from './../VideoPlayer';
import {
  UploadContainer,
  MediaContainer,
  LoadingIndicator,
  MediaTextContent,
} from './_styled';
import {Alert, Platform} from 'react-native';

interface IUpload {
  readonly title?: string;
  readonly onResponse?: any;
}

const OPTIONS: ImagePickerOptions = {
  title: 'Seleciona o video',
  cancelButtonTitle: 'Ok',
  storageOptions: {
    path: 'photos',
    skipBackup: true,
  },
  videoQuality: 'high',
  mediaType: 'video',
};

const GuupGallery = forwardRef<any, IUpload>(
  (props, ref): ReactElement => {
    const {title, onResponse} = props;
    const [source, setSource] = useState<any>();
    const [fileUploadInfo, setFileUploadInfo] = useState<IFileDatUpload>();
    const [loading, setLoading] = useState<boolean>(false);
    // handlers
    const pickSourceLibrary = () => {
      setLoading(true);
      ImagePicker.launchImageLibrary(OPTIONS, async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          Alert.alert(
            'Error ✋',
            'Aconteceu um erro na hora de subir a imagem, tente novamente',
          );
          console.log('ImagePicker Error: ', response.error);
        } else {
          console.log('response: ', response);
          const {uri, type, fileSize, width, height} = response;
          const fileSource = {uri, type};
          setSource(fileSource);
          setFileUploadInfo({
            uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
            type: `${type || 'mp4'}`,
            fileSize,
            width,
            height,
          });
        }
        setLoading(false);
      });
    };
    const onLoadStart = () => {};
    const onLoadEnd = () => {
      if (!source) {
        return;
      }
      setLoading(false);
    };
    // End handlers
    // Effects
    useEffect(() => {
      if (fileUploadInfo) {
        onResponse(fileUploadInfo);
      }
    }, [fileUploadInfo]);
    // End effects
    return (
      <UploadContainer>
        {source && <VideoPlayer source={source} muted repeat />}
        <MediaContainer
          ref={ref}
          source={source}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          resizeMode="cover">
          {loading ? (
            <>
              <LoadingIndicator size="small" />
              <Separator size="large" />
            </>
          ) : (
            <Action onPress={() => pickSourceLibrary()}>
              <MediaTextContent>
                <Icon source="video" size="small" tintColor="ligth" />
                {title && (
                  <Text preset="chat" color="ligth" center underline bold>
                    {title}
                  </Text>
                )}
                <Separator size="large" />
              </MediaTextContent>
            </Action>
          )}
        </MediaContainer>
      </UploadContainer>
    );
  },
);

export default GuupGallery;
