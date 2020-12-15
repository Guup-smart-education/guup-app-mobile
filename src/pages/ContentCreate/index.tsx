/* eslint-disable react-native/no-inline-styles */
import R from 'ramda';
import React, {useState, useEffect, useContext} from 'react';
import {useForm} from 'react-hook-form';
import {
  Container,
  InputArea,
  Link,
  Text,
  GuupTabs,
  GuupProgress,
  Action,
  Icon,
} from './../../ui/';
import {
  KeyboardBlock,
  GuupGallery,
  GuupHeader,
  GuupImagePicker,
  Modal,
  GuupFooter,
  SmartForm,
  VideoPlayer,
  Carousel,
} from './../../components';
import {
  CreateHeader,
  CreateBody,
  FooterLabels,
  CreateMedia,
  FormContainer,
  CreateContainer,
  CreateModalForm,
  CreateFooter,
  FormUploadProgress,
  MediaPageContainer,
  MediaPageItem,
} from './_styled';
import {
  MAX_COURSE_TITLE_LENGTH,
  MAX_COURSE_DESCRIPTION_LENGTH,
} from './../../constants';
import {ContentCreateValidation} from './../../validations';
import {ContentCreateFormData} from './../../@types/forms.data';
import {ContentCreatePropsApp} from './../../@types/app.navigation';
import {
  useCreateCourseMutation,
  EnumContentType,
  EnumAreas,
  EnumLevels,
  IMetaData,
} from './../../graphql/types.d';
import {IFileImagePicker} from './../../@types/fileDataUpload';
import {Alert, StyleSheet, ScrollView} from 'react-native';
import {
  STORAGE_FOLDERS,
  getUriBlobFile,
  createBlobFileName,
  sendFileToStorage,
  getDowloadUrl,
} from './../../utils/storage';
import AuthContext from './../../contexts/auth';
import FastImage from 'react-native-fast-image';
import nextId from 'react-id-generator';

enum EPage {
  'video' = 'video',
  'cover' = 'cover',
}

const getFileData = async (fileDataToUpload: IFileImagePicker): IFileData => {
  const metaData: any = {
    ...R.omit(['uri'], fileDataToUpload.fileUploadInfo),
  };
  const blobFile: Blob = await getUriBlobFile(fileDataToUpload.source.uri);
  const fileName: string = await createBlobFileName(
    fileDataToUpload.fileUploadInfo.type,
  );
  return {
    metaData,
    blobFile,
    fileName,
  };
};

interface IFileData {
  readonly metaData: any;
  readonly blobFile: Blob;
  readonly fileName: string;
}

const ContentCreate: React.FC<ContentCreatePropsApp> = ({
  navigation: {goBack},
  route: {
    params: {path},
  },
}) => {
  const {user} = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [fileDataToUpload, setFileToUpload] = useState<IFileImagePicker>();
  const [fileCoverToUpload, setCoverToUpload] = useState<IFileImagePicker>();
  const [createCourse, {loading, data, error}] = useCreateCourseMutation();
  const [page, setPage] = useState<keyof typeof EPage>('video');
  const {register, errors, getValues, setValue, handleSubmit} = useForm<
    ContentCreateFormData
  >({
    validationSchema: ContentCreateValidation,
  });
  // Effects
  useEffect(() => {
    if (data?.createCourse?.__typename === 'ErrorResponse') {
      Alert.alert('Aconteceu um erro', `${data?.createCourse.error.message}`);
    } else if (data?.createCourse?.__typename === 'CreateCourse') {
      Alert.alert('Parabens!!', 'Conteudo adicionado com sucesso', [
        {
          text: 'ok',
          onPress: () => goBack(),
        },
      ]);
    }
  }, [data, goBack]);
  useEffect(() => {
    if (error) {
      Alert.alert(
        'Aconteceu um erro',
        `${error?.message || 'Oops! tenta novamente porfavor'}`,
      );
    }
  }, [error]);
  useEffect(() => {
    register({name: 'title'});
    register({name: 'description'});
  }, [register]);
  // End effects

  // handlers
  const onUploading = (progress: number) => {
    setUploadingProgress(progress);
  };
  const onSubmit: (dataContent: ContentCreateFormData) => void = async ({
    title = '',
    description = '',
  }) => {
    if (!user || !fileDataToUpload || !fileCoverToUpload) {
      Alert.alert('Erro de sessão', 'Tente logar novamente');
      return false;
    }
    setUploading(true);
    // User information
    const {uid, profile} = user;
    // Cover information
    const coverFile: IFileData = await getFileData(fileCoverToUpload);
    const coverMetadata: IMetaData = await sendFileToStorage(
      coverFile.blobFile,
      coverFile.metaData,
      `${uid}`,
      coverFile.fileName,
      STORAGE_FOLDERS.cover,
      onUploading,
    );
    const coverURL = await getDowloadUrl(coverMetadata.fileFullPath);
    // Video information
    const videoFile: IFileData = await getFileData(fileDataToUpload);
    const videoMetadata: IMetaData = await sendFileToStorage(
      videoFile.blobFile,
      videoFile.metaData,
      `${uid}`,
      videoFile.fileName,
      STORAGE_FOLDERS.courses,
      onUploading,
    );
    setUploading(false);
    if (!videoMetadata || !coverMetadata) {
      Alert.alert(
        'Erro no conteudo',
        'Aconteceu um erro na hora de subir conteudo, tente novamente',
      );
      return false;
    }
    // Send course to Firestore
    createCourse({
      variables: {
        course: {
          title,
          description,
          typeContent: EnumContentType.Video,
          area: EnumAreas.Technology,
          difficult: EnumLevels.Advance,
          photoURL: coverURL,
          ...(path && {path}),
        },
        videoMetadata,
        coverMetadata,
        ownerProfile: {
          photoURL: profile?.photoURL,
          thumbnailURL: profile?.thumbnailURL,
          displayName: profile?.displayName,
          profission: profile?.profission,
        },
      },
    });
  };
  const closeContent = () => {
    if (loading || uploading) {
      return;
    }
    if (
      fileCoverToUpload ||
      fileDataToUpload ||
      getValues('title') ||
      getValues('description')
    ) {
      Alert.alert(
        'Aguarda um momento!',
        'Você deseja descartar as informações prenchidas?',
        [
          {
            text: 'Sim',
            onPress: () => goBack(),
            style: 'destructive',
          },
          {
            text: 'Não',
          },
        ],
      );
    } else {
      goBack();
    }
  };
  const addDescription = () => {
    if (!fileDataToUpload || !fileCoverToUpload) {
      Alert.alert('Video!!', 'Você ainda não selecionou seu video e/ou capa');
      return;
    }
    setFormVisible(!formVisible);
  };
  // End handlers
  return (
    <Container safe dark>
      <CreateContainer>
        <CreateHeader>
          <GuupHeader
            leftRenderIntem={
              <Action onPress={() => !loading && closeContent()}>
                <Icon burble back source="back" size="small" tintColor="dark" />
              </Action>
            }
            isDarkTheme
            title="Criar conteudo"
            // onLeftPress={() => !loading && closeContent()}
            rightRenderIntem={
              <Link
                preset="outline"
                color="contrast"
                loading={loading || uploading}
                onPress={() => addDescription()}>
                Próximo
              </Link>
            }
          />
        </CreateHeader>
        <CreateBody renderToHardwareTextureAndroid focusable={false}>
          <CreateMedia>
            <GuupImagePicker
              mediaType={page === 'video' ? 'video' : 'photo'}
              title="Selecione midia"
              titleColor="ligth"
              videoQuality="medium"
              imageQuality={0.5}
              onLoading={(imageLoad) => setMediaLoading(imageLoad)}
              onResponse={(mediaData: IFileImagePicker) => {
                page === 'video'
                  ? setFileToUpload(mediaData)
                  : setCoverToUpload(mediaData);
              }}
            />
          </CreateMedia>
        </CreateBody>
        <CreateFooter>
          <GuupTabs
            items={[
              {label: 'Video', key: EPage.video},
              {label: 'Capa', key: EPage.cover},
            ]}
            active={page}
            onTabPress={(key: any) => setPage(key)}
          />
        </CreateFooter>
      </CreateContainer>
      <MediaPageContainer style={StyleSheet.absoluteFill}>
        <Carousel
          showDots={false}
          page={page === 'video' ? 0 : 1}
          paging
          size={2}>
          <MediaPageItem key={nextId('media-video-')}>
            {fileDataToUpload && (
              <VideoPlayer
                style={StyleSheet.absoluteFill}
                source={{uri: fileDataToUpload?.source.uri}}
                repeat
                // resizeMode="cover"
                muted
              />
            )}
          </MediaPageItem>
          <MediaPageItem key={nextId('media-cover-')}>
            {fileCoverToUpload && (
              <FastImage
                style={StyleSheet.absoluteFill}
                source={{
                  uri: fileCoverToUpload?.source.uri,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
          </MediaPageItem>
        </Carousel>
      </MediaPageContainer>
      {/* {page === 'video' ? (
        <VideoPlayer
          style={StyleSheet.absoluteFill}
          source={{uri: fileDataToUpload?.source.uri}}
          repeat
          resizeMode="cover"
          muted
        />
      ) : (
        <FastImage
          style={StyleSheet.absoluteFill}
          source={{
            uri: fileCoverToUpload?.source.uri,
            priority: FastImage.priority.high,
          }}
          resizeMode="cover"
        />
      )} */}
      <Modal visible={formVisible} presentationStyle="formSheet">
        <KeyboardBlock hasKeyboardDismiss paddingPageSheet>
          <CreateModalForm>
            <FormContainer>
              <SmartForm
                {...{
                  register,
                  setValue,
                  errors,
                }}>
                <InputArea
                  maxLength={MAX_COURSE_TITLE_LENGTH}
                  name="title"
                  editable={!loading}
                  placeholder="Digite um bom titulo para o conteudo aqui…"
                  label="Titulo do conteudo"
                />
                <InputArea
                  maxLength={MAX_COURSE_DESCRIPTION_LENGTH}
                  name="description"
                  editable={!loading}
                  label="Descrição (Opcional)"
                  placeholder="Digite uma breve descripção aquí…"
                />
              </SmartForm>
            </FormContainer>
            {!!uploadingProgress && (
              <FormUploadProgress>
                <GuupProgress progress={`${uploadingProgress.toString()}`} />
              </FormUploadProgress>
            )}
            <GuupFooter color="ligth">
              <FooterLabels>
                <Link
                  disable={loading}
                  color="dark"
                  onPress={() => setFormVisible(!formVisible)}>
                  Fechar
                </Link>
                <Link
                  preset="solid"
                  disable={!fileDataToUpload || !getValues('title')}
                  loading={loading || uploading}
                  onPress={handleSubmit(onSubmit)}>
                  Publicar
                </Link>
              </FooterLabels>
            </GuupFooter>
          </CreateModalForm>
        </KeyboardBlock>
      </Modal>
    </Container>
  );
};

export default ContentCreate;
