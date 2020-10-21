import React, {useState, forwardRef, ReactElement} from 'react';
import {Alert, TextInputProps} from 'react-native';
import {Action, Separator, Icon, Text} from './../../ui';
import ImagePicker, {ImagePickerOptions} from 'react-native-image-picker';
import {
  UploadContainer,
  MediaContainer,
  LoadingIndicator,
  MediaTextContent,
  TextInputNone,
} from './_styled';

interface IUpload extends TextInputProps {
  readonly title?: string;
}

const OPTIONS: ImagePickerOptions = {
  title: 'Seleciona o video',
  cancelButtonTitle: 'Ok',
};

const GuupUpload = forwardRef<any, IUpload>(
  (props, ref): ReactElement => {
    const {title, ...args} = props;
    const [source, setSource] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    // handlers
    const pickSourceLibrary = () => {
      setLoading(true);
      ImagePicker.launchImageLibrary(OPTIONS, (response) => {
        const {error, data} = response;
        if (error) {
          Alert.alert('oops!!', 'Tenten novamente por favor 🙏');
          return;
        }
        if (data) {
          setSource(data);
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
    return (
      <UploadContainer>
        <TextInputNone
          {...args}
          ref={ref}
          value={source}
          autoCorrect={false}
          blurOnSubmit={false}
          multiline
        />
        <MediaContainer
          source={{uri: `data:image/jpeg;base64,${source}`}}
          blurRadius={6}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          resizeMode="cover">
          {loading ? (
            <LoadingIndicator size="large" />
          ) : (
            <Action onPress={() => pickSourceLibrary()}>
              <MediaTextContent>
                <Icon source="gallery" size="large" />
                <Text preset="label" color="dark" center underline bold>
                  {title || 'Faz upload de uma imagem ou video'}
                </Text>
              </MediaTextContent>
            </Action>
          )}
        </MediaContainer>
      </UploadContainer>
    );
  },
);

export default GuupUpload;
