/* eslint-disable react-hooks/exhaustive-deps */
// import RNFetchBlob from 'rn-fetch-blob';
import React, {useState, forwardRef, ReactElement, useEffect} from 'react';
import {IFileDatUpload, IFileImagePicker} from './../../@types/fileDataUpload';
import {Link, ActivityIndicator} from './../../ui';
import ImagePicker, {ImagePickerOptions} from 'react-native-image-picker';
import {Alert, Platform} from 'react-native';
import {EColors} from './../../@enum/color.enum';

interface IUpload {
  readonly title?: string;
  readonly titleColor?: keyof typeof EColors;
  readonly onResponse: (response: IFileImagePicker) => void;
  readonly onLoading: (loading: boolean) => void;
  readonly options?: ImagePickerOptions;
  readonly withThumbnail?: boolean;
}

const OPTIONS: ImagePickerOptions = {
  title: 'Seleciona o video',
  cancelButtonTitle: 'Ok',
  storageOptions: {
    path: 'photos',
    skipBackup: true,
  },
  quality: 0.1,
  mediaType: 'photo',
  maxWidth: 1400,
};

const GuupUpload = forwardRef<any, IUpload>(
  (props, ref): ReactElement => {
    const {
      title,
      titleColor,
      onResponse,
      onLoading,
      options = {},
      withThumbnail = false,
    } = props;
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
      return <ActivityIndicator color="ligth" />;
    }
    return (
      <Link color={titleColor || 'ligth'} onPress={() => pickSourceLibrary()}>
        {title || 'Selecione uma iamgem'}
      </Link>
    );
  },
);

export default GuupUpload;
