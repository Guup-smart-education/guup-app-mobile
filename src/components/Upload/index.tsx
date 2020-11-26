/* eslint-disable react-hooks/exhaustive-deps */
// import RNFetchBlob from 'rn-fetch-blob';
import React, {useState, forwardRef, ReactElement, useEffect} from 'react';
import {IFileDatUpload} from './../../@types/fileDataUpload';
import {Action, Icon, Text} from './../../ui';
import ImagePicker, {ImagePickerOptions} from 'react-native-image-picker';
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
};

const GuupUpload = forwardRef<any, IUpload>(
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
          const {uri, type, fileSize, width, height} = response;
          const imageSource = {uri, type};
          setSource(imageSource);
          setFileUploadInfo({
            uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
            type: `${type}`,
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
        <MediaContainer
          ref={ref}
          source={source}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          resizeMode="cover">
          {loading ? (
            <LoadingIndicator size="large" />
          ) : (
            <Action onPress={() => pickSourceLibrary()}>
              <MediaTextContent>
                <Icon source="gallery" size="large" />
                {title && (
                  <Text preset="label" color="dark" center underline bold>
                    {title}
                  </Text>
                )}
              </MediaTextContent>
            </Action>
          )}
        </MediaContainer>
      </UploadContainer>
    );
  },
);

export default GuupUpload;
