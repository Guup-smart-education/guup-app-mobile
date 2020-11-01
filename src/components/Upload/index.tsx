import React, {useState, forwardRef, ReactElement, useEffect} from 'react';
import {Alert, TextInputProps} from 'react-native';
import {Action, Icon, Text} from './../../ui';
import ImagePicker, {ImagePickerOptions} from 'react-native-image-picker';
import {
  UploadContainer,
  MediaContainer,
  LoadingIndicator,
  MediaTextContent,
  TextInputNone,
} from './_styled';

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
};

const GuupUpload = forwardRef<any, IUpload>(
  (props, ref): ReactElement => {
    const {title, onResponse} = props;
    const [source, setSource] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    // handlers
    const pickSourceLibrary = () => {
      setLoading(true);
      ImagePicker.launchImageLibrary(OPTIONS, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const imageSource = {uri: response.uri};
          console.log('imageSource: ', imageSource);
          setSource(imageSource);
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
      onResponse(source);
    }, [source, onResponse]);
    // End effects
    return (
      <UploadContainer>
        <MediaContainer
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
