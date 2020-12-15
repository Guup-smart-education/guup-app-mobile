/* eslint-disable react-hooks/exhaustive-deps */
// import RNFetchBlob from 'rn-fetch-blob';
import React, {useState, forwardRef, ReactElement, useEffect} from 'react';
import {IFileDatUpload, IFileImagePicker} from './../../@types/fileDataUpload';
import {Link, ActivityIndicator} from './../../ui';
import ImagePicker, {ImagePickerOptions} from 'react-native-image-picker';
import {Alert, Platform} from 'react-native';
import {EColors} from './../../@enum/color.enum';

enum EMediaType {
  'photo' = 'photo',
  'video' = 'video',
}

enum EVideoQuality {
  'low' = 'low',
  'medium' = 'medium',
  'high' = 'high',
}

interface IUpload {
  readonly title?: string;
  readonly titleColor?: keyof typeof EColors;
  readonly onResponse: (response: IFileImagePicker) => void;
  readonly onLoading: (loading: boolean) => void;
  readonly options?: ImagePickerOptions;
  readonly withThumbnail?: boolean;
  readonly mediaType?: keyof typeof EMediaType;
  readonly videoQuality?: keyof typeof EVideoQuality;
  readonly imageQuality?: number;
}

const GuupUpload = forwardRef<any, IUpload>(
  (props, ref): ReactElement => {
    const {
      title,
      titleColor,
      onResponse,
      onLoading,
      options = {},
      mediaType = 'photo',
      imageQuality = 0.1,
      videoQuality = 'medium',
    } = props;
    // ImagePicker Config
    const OPTIONS: ImagePickerOptions = {
      title: 'Selecione a midia',
      cancelButtonTitle: 'Ok',
      storageOptions: {
        path: `${mediaType}`,
        skipBackup: true,
      },
      quality: imageQuality,
      mediaType,
      maxWidth: 1400,
      videoQuality: videoQuality,
    };
    const [source, setSource] = useState<any>();
    const [fileUploadInfo, setFileUploadInfo] = useState<IFileDatUpload>();
    const [allIsReady, setAllIsReady] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    // handlers
    const pickSourceLibrary = () => {
      setLoading(true);
      setAllIsReady(false);
      ImagePicker.launchImageLibrary(
        {...OPTIONS, ...options},
        async (response) => {
          if (response.error) {
            Alert.alert(
              'Error ✋',
              'Aconteceu um erro na hora de subir a imagem, tente novamente',
            );
            setLoading(false);
            console.log('MediaPicker Error: ', response.error);
          } else if (response.didCancel) {
            setLoading(false);
            console.log('MediaPicker didCancel: ');
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
            setAllIsReady(true);
          }
          setLoading(false);
        },
      );
    };
    // End handlers
    // Effects
    useEffect(() => {
      if (source && fileUploadInfo) {
        onResponse({source, fileUploadInfo});
      }
    }, [allIsReady]);
    useEffect(() => {
      onLoading(loading);
    }, [loading]);
    // End effects
    if (loading) {
      return <ActivityIndicator color="ligth" size="small" />;
    }
    return (
      <Link color={titleColor || 'ligth'} onPress={() => pickSourceLibrary()}>
        {title || 'Selecione uma iamgem'}
      </Link>
    );
  },
);

export default GuupUpload;
