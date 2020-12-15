import R from 'ramda';
import React, {useState, useEffect, useContext} from 'react';
import {Container, Text, InputArea, Separator, Link} from './../../ui';
import {
  KeyboardBlock,
  GuupHeader,
  GuupFooter,
  GuupImagePicker,
  GuupProgressBar,
} from './../../components';
import {PropsApp} from './../../@types/app.navigation';
import {IFileImagePicker} from './../../@types/fileDataUpload';
import {
  CreateContainer,
  CreateBody,
  CreateHeader,
  CreateActions,
  CreateImage,
  CreateInput,
  CreateFooter,
} from './_styled';
import {useCreatePostMutation, IMetaData} from './../../graphql/types.d';
import {Alert} from 'react-native';
import {MAX_POST_DESCRIPTION_LENGTH} from './../../constants';
import {
  STORAGE_FOLDERS,
  getUriBlobFile,
  createBlobFileName,
  sendFileToStorage,
  getDowloadUrl,
} from './../../utils/storage';
import AuthContext from './../../contexts/auth';
import FastImage from 'react-native-fast-image';

const PostCreate: React.FC<PropsApp> = ({navigation: {goBack}}) => {
  const {user} = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const [createPost, {loading, data, error}] = useCreatePostMutation();
  const [post, setPost] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageUpload, setImageUpload] = useState<IFileImagePicker>();
  const [uploadingProgress, setUploadingProgress] = useState(0);

  // Effects
  useEffect(() => {
    if (data?.createPost?.__typename === 'CreatePost') {
      Alert.alert('Parabens!! 🎉', 'Publicação feita com sucesso', [
        {
          onPress: () => goBack(),
        },
      ]);
    } else if (data?.createPost?.__typename === 'ErrorResponse') {
      Alert.alert(
        'Error!! 😅',
        data.createPost.error.message ||
          'Aconteceu um problema, tente novamente',
      );
    }
    return () => {
      setPost('');
    };
  }, [data, goBack]);
  useEffect(() => {
    if (error) {
      Alert.alert(
        'Problema inesperado!! 😭',
        error.message || 'Aconteceu um problema, tente novamente',
      );
    }
  }, [error]);
  // End effects
  // handlers
  const onUploading = (progress: number) => {
    console.log('onUploading progress: ', progress);
    setUploadingProgress(progress);
  };
  const sendPosts = async () => {
    let mediaPhoto = '';
    if (!user || !user.profile) {
      Alert.alert(
        'Erro de sessão',
        'Não encontramos o usuario, tente logar novamente',
      );
      return null;
    }
    const {
      uid,
      profile: {displayName, profission, photoURL, thumbnailURL},
    } = user;
    let fileInformation: IMetaData | null = null;
    if (imageUpload) {
      setUploading(true);
      const metaData: any = {...R.omit(['uri'], imageUpload.fileUploadInfo)};
      const blobFile: Blob = await getUriBlobFile(
        imageUpload.fileUploadInfo.uri,
      );
      const fileName: string = await createBlobFileName(
        imageUpload.fileUploadInfo.type,
      );
      fileInformation = await sendFileToStorage(
        blobFile,
        metaData,
        `${uid}`,
        fileName,
        STORAGE_FOLDERS.posts,
        onUploading,
      );
      mediaPhoto = await getDowloadUrl(fileInformation.fileFullPath);
      setUploading(false);
    }
    createPost({
      variables: {
        description: post,
        photoURL: mediaPhoto,
        ownerProfile: {
          displayName,
          photoURL,
          thumbnailURL,
          profission,
        },
        metadata: fileInformation,
      },
    });
    // End handlers
  };
  return (
    <Container safe light>
      <KeyboardBlock hasKeyboardDismiss behavior="position">
        <CreateContainer>
          <CreateHeader>
            <GuupHeader
              hasBack
              title="Compartir"
              loading={loading}
              onLeftPress={() => !loading && goBack()}
            />
          </CreateHeader>
          <CreateBody>
            <CreateImage
              as={FastImage}
              source={{
                uri: imageUpload?.source.uri,
              }}>
              <GuupImagePicker
                title="Adicione uma imagen"
                titleColor="ligth"
                onLoading={(imageLoad) => setImageLoading(imageLoad)}
                onResponse={(imageData: IFileImagePicker) => {
                  setImageUpload(imageData);
                }}
              />
              <Separator size="small" />
              <Text
                color="ligth"
                center>{`Pode criar um conteudo ${'\n'}com ou sem imagem`}</Text>
            </CreateImage>
            <CreateInput>
              <InputArea
                label="Digite algo"
                editable={!loading && !uploading}
                maxLength={MAX_POST_DESCRIPTION_LENGTH}
                onChangeText={(val: string) => setPost(val)}
                placeholder="Compartilhe alguma coisa interesante"
              />
            </CreateInput>
          </CreateBody>
          <Separator size="stroke" />
          <CreateFooter>
            {/* <GuupProgressBar progress={uploadingProgress} /> */}
            <Separator size="stroke" color="primary" />
            <GuupFooter color="ligth">
              <CreateActions>
                <Link disable={loading} color="dark" onPress={() => goBack()}>
                  Fechar
                </Link>
                <Link
                  preset="solid"
                  disable={!post || uploading}
                  loading={loading || uploading}
                  onPress={() => {
                    sendPosts();
                  }}>
                  Próximo
                </Link>
              </CreateActions>
            </GuupFooter>
          </CreateFooter>
        </CreateContainer>
      </KeyboardBlock>
    </Container>
  );
};

export default PostCreate;
