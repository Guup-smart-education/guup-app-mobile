/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  Container,
  Text,
  InputArea,
  Separator,
  RowFullWidth,
  Action,
  Icon,
  Link,
} from './../../ui/';
import {
  KeyboardBlock,
  GuupUpload,
  GuupHeader,
  GuupFooter,
  SmartForm,
} from './../../components';
import {
  CreateHeader,
  CreateBody,
  FooterLabels,
  CreateMedia,
  FormContainer,
  CreateContainer,
} from './_styled';
import nextId from 'react-id-generator';
import {ContentCreateValidation} from './../../validations';
import {ContentCreateFormData} from './../../@types/forms.data';
import {FormContentCreate} from './../../forms';
import {ContentCreatePropsApp} from './../../@types/app.navigation';
import {SmartInputProps} from './../../@types/smart.input';
import {
  useCreateCourseMutation,
  EnumContentType,
  EnumAreas,
  EnumLevels,
} from './../../graphql/types.d';
import {Alert, View, TextInput} from 'react-native';

const ContentCreate: React.FC<ContentCreatePropsApp> = ({
  navigation: {goBack, navigate},
  route: {
    params: {path},
  },
}) => {
  const [contentSource, setContentSource] = useState<any>(null);
  const [createCourse, {loading, data, error}] = useCreateCourseMutation();
  const {
    register,
    errors,
    getValues,
    setValue,
    handleSubmit,
    formState,
    control,
  } = useForm<ContentCreateFormData>({
    validationSchema: ContentCreateValidation,
  });

  // Effects
  useEffect(() => {
    if (data?.createCourse?.__typename === 'ErrorResponse') {
      Alert.alert('Aconteceu um erro', `${data?.createCourse.error.message}`);
    } else if (data?.createCourse?.__typename === 'CreateCourse') {
      Alert.alert('Parabens!!', 'Conteudo adicionado com sucesso');
      goBack();
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
  const onSubmit: (dataContent: ContentCreateFormData) => void = ({
    title = '',
    description = '',
  }) => {
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
      },
    });
  };
  const closeContent = () => {
    if (loading) {
      return;
    }
    if (contentSource || getValues('title') || getValues('description')) {
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
  const onUploadVideo = (source: any) => {
    setContentSource(source);
  };
  // End handlers
  return (
    <Container safe light>
      <KeyboardBlock hasKeyboardDismiss>
        <CreateContainer>
          <CreateHeader>
            <GuupHeader
              leftRenderIntem={
                <Action onPress={() => !loading && closeContent()}>
                  <Icon source="arrow" />
                </Action>
              }
              centerRenderItem={
                <Text preset="comment" bold>
                  Conteudo
                </Text>
              }
            />
          </CreateHeader>
          <CreateBody renderToHardwareTextureAndroid focusable={false}>
            <CreateMedia>
              <GuupUpload
                onResponse={onUploadVideo}
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
                  name="title"
                  editable={!loading}
                  placeholder="Digite um bom titulo para o conteudo aqui…"
                  preset="subtitle"
                  color="dark"
                  style={{width: '75%'}}
                />
                <InputArea
                  name="description"
                  editable={!loading}
                  placeholder="Digite uma breve descripção aquí…"
                />
              </SmartForm>
            </FormContainer>
          </CreateBody>
          <Separator size="stroke" />
          <GuupFooter color="ligth">
            <FooterLabels>
              <Link
                disable={loading}
                color="dark"
                onPress={() => closeContent()}>
                Fechar
              </Link>
              <Link
                preset="solid"
                disable={loading || !contentSource || !getValues('title')}
                loading={loading}
                onPress={handleSubmit(onSubmit)}>
                Publicar
              </Link>
            </FooterLabels>
          </GuupFooter>
        </CreateContainer>
      </KeyboardBlock>
    </Container>
  );
};

export default ContentCreate;
