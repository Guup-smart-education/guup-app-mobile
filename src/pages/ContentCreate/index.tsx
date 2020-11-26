/* eslint-disable react-native/no-inline-styles */
import R from 'ramda';
import React, {useState, useEffect, useContext} from 'react';
import {useForm} from 'react-hook-form';
import {
  Container,
  Text,
  InputArea,
  Separator,
  Action,
  Icon,
  Link,
} from './../../ui/';
import {
  KeyboardBlock,
  GuupUpload,
  GuupGallery,
  GuupHeader,
  Modal,
  GuupFooter,
  SmartForm,
  GuupProgressBar,
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
  MediaMetaData,
} from './../../graphql/types.d';
import {IFileDatUpload} from './../../@types/fileDataUpload';
import {Alert, View} from 'react-native';
import {
  STORAGE_FOLDERS,
  getUriBlobFile,
  createBlobFileName,
  sendFileToStorage,
} from './../../utils/storage';
import AuthContext from './../../contexts/auth';

const ContentCreate: React.FC<ContentCreatePropsApp> = ({
  navigation: {goBack, navigate},
  route: {
    params: {path},
  },
}) => {
  const {user} = useContext(AuthContext);
  const [page, setPage] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [fileDataToUpload, setFileToUpload] = useState<IFileDatUpload>();
  const [videoDataToUpload, setVideoToUpload] = useState<IFileDatUpload>();
  const [createCourse, {loading, data, error}] = useCreateCourseMutation();
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
    console.log('onUploading progress: ', progress);
    setUploadingProgress(progress);
  };
  const onSubmit: (dataContent: ContentCreateFormData) => void = async ({
    title = '',
    description = '',
  }) => {
    if (fileDataToUpload && user) {
      setUploading(true);
      const metaData: any = {...R.omit(['uri'], fileDataToUpload)};
      const blobFile: Blob = await getUriBlobFile(fileDataToUpload.uri);
      const fileName: string = await createBlobFileName(fileDataToUpload.type);
      const metadata: IMetaData = await sendFileToStorage(
        blobFile,
        metaData,
        `${user.uid}`,
        fileName,
        STORAGE_FOLDERS.courses,
        onUploading,
      );
      setUploading(false);
      createCourse({
        variables: {
          course: {
            title,
            description,
            typeContent: EnumContentType.Video,
            area: EnumAreas.Technology,
            difficult: EnumLevels.Advance,
            ...(path && {path}),
          },
          metadata,
        },
      });
    } else {
      Alert.alert('Oops!', 'Selecione outro arquivo para subir');
      console.log('Não foi encontrada um arquivo para subir');
    }
  };
  const closeContent = () => {
    if (loading || uploading) {
      return;
    }
    if (fileDataToUpload || getValues('title') || getValues('description')) {
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
    if (!fileDataToUpload) {
      Alert.alert('Video!!', 'Você ainda não selecionou seu conteudo');
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
            hasBack
            isDarkTheme
            title="Criar conteudo"
            onLeftPress={() => !loading && closeContent()}
            rightRenderIntem={
              <Link
                preset="outline"
                color="contrast"
                // disable={!fileDataToUpload || !getValues('title')}
                loading={loading || uploading}
                onPress={() => addDescription()}>
                {/* onPress={handleSubmit(onSubmit)}> */}
                Próximo
              </Link>
            }
          />
        </CreateHeader>
        {/* <GuupProgressBar progress={uploadingProgress} /> */}
        <CreateBody renderToHardwareTextureAndroid focusable={false}>
          <CreateMedia>
            <GuupGallery
              onResponse={setFileToUpload}
              title="Selecione seu video"
            />
          </CreateMedia>
          {/* <Separator size="small" />
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
                  // preset="paragraph"
                  // color="dark"
                  // style={{width: '75%'}}
                />
                <InputArea
                  maxLength={MAX_COURSE_DESCRIPTION_LENGTH}
                  name="description"
                  editable={!loading}
                  label="Descrição"
                  placeholder="Digite uma breve descripção aquí…"
                />
              </SmartForm>
            </FormContainer> */}
        </CreateBody>
        {/* <Carousel size={2} showDots={false} paging page={page}>
            <CreateBody renderToHardwareTextureAndroid focusable={false}>
              <CreateMedia>
                <GuupGallery
                  onResponse={setVideoToUpload}
                  title="Selecione uma capa para a sua colecao!"
                />
              </CreateMedia>
            </CreateBody>
            <CreateBody renderToHardwareTextureAndroid focusable={false}>
              <CreateMedia>
                <GuupUpload
                  onResponse={setFileToUpload}
                  title="Selecione uma capa para a sua colecao!"
                />
              </CreateMedia>
              <Separator size="small" />
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
                    // preset="paragraph"
                    // color="dark"
                    // style={{width: '75%'}}
                  />
                  <InputArea
                    maxLength={MAX_COURSE_DESCRIPTION_LENGTH}
                    name="description"
                    editable={!loading}
                    label="Descrição"
                    placeholder="Digite uma breve descripção aquí…"
                  />
                </SmartForm>
              </FormContainer>
            </CreateBody>
          </Carousel> */}
        {/* <GuupProgressBar progress={uploadingProgress} /> */}
        {/* <Separator size="stroke" />
          <GuupFooter color="ligth">
            <FooterLabels>
              <Link
                disable={loading}
                color="dark"
                onPress={() => closeContent()}>
                Upload video
              </Link>
              <Link
                preset="solid"
                disable={!fileDataToUpload || !getValues('title')}
                loading={loading || uploading}
                onPress={handleSubmit(onSubmit)}>
                Publicar
              </Link>
            </FooterLabels>
          </GuupFooter> */}
      </CreateContainer>
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
                  // preset="title"
                  // color="dark"
                  // style={{width: '75%'}}
                />
                <InputArea
                  maxLength={MAX_COURSE_DESCRIPTION_LENGTH}
                  name="description"
                  editable={!loading}
                  label="Descrição (Opcional)"
                  // preset="subtitle"
                  placeholder="Digite uma breve descripção aquí…"
                />
              </SmartForm>
            </FormContainer>
            {/* <GuupProgressBar progress={uploadingProgress} /> */}
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
