/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useState, useContext, useEffect, useCallback} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  Text,
  Separator,
  Container,
  Link,
  Action,
  InputArea,
  Icon,
  ActivityIndicator,
} from './../../ui';
import {
  GuupHeader,
  Modal,
  KeyboardBlock,
  GuupActions,
  SmartForm,
  GuupImagePicker,
  GuupMenuList,
} from './../../components';
import {ProfilePropsApp} from './../../@types/app.navigation';
import {IFileImagePicker} from './../../@types/fileDataUpload';
import {
  ProfileContainer,
  ProfileUserPicture,
  ProfileuserData,
  ProfileContent,
  ProfileHeader,
  ProfileBody,
  ProfileEditContainer,
  ProfileEditFooter,
  ProfileEditBody,
  ProfileEditHeader,
  ProfileBottom,
  ProfileTop,
} from './_styled';
import AuthContext from './../../contexts/auth';
import {
  useUpdateUserProfileMutation,
  UserProfile,
  IMetaData,
  User,
  useGetUserLazyQuery,
} from './../../graphql/types.d';
import {useForm} from 'react-hook-form';
import {
  STORAGE_FOLDERS,
  getUriBlobFile,
  createBlobFileName,
  sendFileToStorage,
  getDowloadUrl,
} from './../../utils/storage';
import FastImage from 'react-native-fast-image';

enum EInputs {
  'DISPLAY_NAME' = 'DISPLAY_NAME',
  'PROFISSION' = 'PROFISSION',
  'PRESENTATION' = 'PRESENTATION',
}

interface IUpdateForm {
  readonly displayName?: string;
  readonly photoURL?: string;
  readonly thumbnailURL?: string;
  readonly profission?: string;
  readonly presentation?: string;
}

const Profile: React.FC<ProfilePropsApp> = ({
  navigation: {goBack, navigate},
  route: {
    params: {type, id},
  },
}) => {
  const [uploading, setUploading] = useState(false);
  const {user, setUpdateSession, signOut} = useContext(AuthContext);
  const [currentInput, setCurrentInput] = useState<keyof typeof EInputs>();
  const [editModal, togleEditModal] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<User | null | undefined>({});
  const [newProfile, setNewProfile] = useState<UserProfile>();
  const [imageUpload, setImageUpload] = useState<IFileImagePicker | null>();
  const [
    updateProfile,
    {data, error, loading},
  ] = useUpdateUserProfileMutation();
  const [
    getUserProfile,
    {data: dataProfile, error: errorProfile, loading: loadingProfile},
  ] = useGetUserLazyQuery();
  const {register, errors, setValue, handleSubmit} = useForm<IUpdateForm>();
  // Handlers
  const toggleModal = () => togleEditModal(!editModal);
  const updateInfo: (input: keyof typeof EInputs) => void = (input) => {
    if (type === 'PUBLIC') {
      return;
    }
    toggleModal();
    setCurrentInput(input);
  };
  const [uploadingProgress, setUploadingProgress] = useState(0);
  // Effects
  useEffect(() => {
    if (!data || !data.updateUserProfile) {
      return;
    }
    if (data.updateUserProfile.__typename === 'UpdateProfile') {
      newProfile && setUpdateSession(newProfile);
      togleEditModal(false);
    } else if (data?.updateUserProfile?.__typename === 'ErrorResponse') {
      Alert.alert('Oops! 😅', `${data.updateUserProfile.error.message}`, [
        {
          text: 'Ok',
        },
      ]);
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      Alert.alert('Oops! 😅', `${error.message}`, [
        {
          text: 'Ok',
        },
      ]);
    }
  }, [error]);
  useEffect(() => {
    if (user && user.profile && type === 'OWNER') {
      setUserProfile(user);
    } else if (type === 'PUBLIC' && id) {
      getUserProfile({
        variables: {
          uid: id,
        },
      });
    }
    return () => {
      setUserProfile(null);
    };
  }, [user]);
  useEffect(() => {
    if (!dataProfile || !dataProfile.getUser) {
      return;
    }
    if (dataProfile.getUser.__typename === 'GetUser') {
      const response: User = dataProfile.getUser.user || {};
      setUserProfile(response);
    } else if (dataProfile.getUser.__typename === 'ErrorResponse') {
      Alert.alert(
        'Usuario não encontrado',
        `Aconteceu um erro: ${dataProfile.getUser.error.message}`,
      );
    }
    return () => {
      setUserProfile(null);
    };
  }, [dataProfile]);
  useEffect(() => {
    [
      'displayName',
      'photoURL',
      'thumbnailURL',
      'profission',
      'presentation',
    ].forEach((name) => register({name, options: {required: false}}));
  }, [register]);
  // End effects
  // End handle
  const onUploading = (progress: number) => {
    setUploadingProgress(progress);
  };
  const sendNewProfileInfo: (profileData: IUpdateForm) => void = (
    profileData,
  ) => {
    const profile: UserProfile = {
      ...userProfile?.profile,
      ...R.filter((item) => !!item, {
        ...profileData,
      }),
    };
    setNewProfile(profile);
    updateProfile({
      variables: {
        ...newProfile,
      },
    });
  };
  const sendProfilePhoto = async () => {
    if (!imageUpload || !userProfile) {
      Alert.alert('Oops!!m', 'Seleciona uma imagem para teu perfil');
      return;
    }
    setUploading(true);
    const metaData: any = {...R.omit(['uri'], imageUpload.fileUploadInfo)};
    const blobFile: Blob = await getUriBlobFile(imageUpload.fileUploadInfo.uri);
    const fileName: string = await createBlobFileName(
      imageUpload.fileUploadInfo.type,
    );
    const fileInformation: IMetaData = await sendFileToStorage(
      blobFile,
      metaData,
      `${userProfile.uid}`,
      fileName,
      STORAGE_FOLDERS.posts,
      onUploading,
    );
    const photoURL = await getDowloadUrl(fileInformation.fileFullPath);
    setUploading(false);
    setUpdateSession({
      ...userProfile.profile,
      photoURL,
      thumbnailURL: photoURL,
    });
    updateProfile({
      variables: {
        ...userProfile.profile,
        photoURL,
        thumbnailURL: photoURL,
      },
    });
  };
  // End handlers
  // Callbacks
  const ProfileHeaderCallBack = useCallback(
    () => (
      <ProfileHeader>
        <GuupHeader
          leftRenderIntem={
            <Action onPress={() => goBack()}>
              <Icon burble back source="back" size="small" tintColor="dark" />
            </Action>
          }
          rightRenderIntem={
            type === 'PUBLIC' ? (
              <></>
            ) : (
              <GuupImagePicker
                title="Foto de perfil"
                titleColor="ligth"
                onLoading={(imageLoad) => setImageLoading(imageLoad)}
                onResponse={(imageDate: IFileImagePicker) => {
                  console.log('imageDate: ', imageDate);
                  setImageUpload(imageDate);
                }}
              />
            )
          }
        />
      </ProfileHeader>
    ),
    [],
  );
  // End Callbacks
  if (loadingProfile) {
    return (
      <Container safe light>
        <ProfileHeaderCallBack />
        <Container center>
          <ActivityIndicator size="small" />
          <Separator size="tiny" />
          <Text bold>Carregando{'\n'}Informações</Text>
        </Container>
      </Container>
    );
  }
  if (!userProfile || !userProfile.profile || errorProfile) {
    return (
      <Container safe light>
        <ProfileHeaderCallBack />
        <Container center>
          <Text>Não há informações para mostrar</Text>
          <Link onPress={() => signOut()}>Fazer login</Link>
        </Container>
      </Container>
    );
  }
  const {
    profile: {displayName, photoURL, profission, presentation},
  } = userProfile;
  return (
    <Container safe light>
      <ProfileContainer>
        <ProfileTop>
          <ProfileHeaderCallBack />
          <ProfileuserData>
            <Text preset="title" color="ligth">
              {displayName}
            </Text>
            {/* <Action onPress={() => updateInfo('DISPLAY_NAME')}>
            </Action> */}
            <Separator size="lili" />
            <Action onPress={() => updateInfo('PROFISSION')}>
              <Text preset="comment" color="ligth" underline={type === 'OWNER'}>
                {profission || 'Adicionar uma profissão'}
              </Text>
            </Action>
          </ProfileuserData>
        </ProfileTop>
        <ProfileBottom>
          <ProfileBody>
            <ProfileContent>
              <Separator size="medium" />
              <Text preset="label" color="darkGrey">
                Apresentação
              </Text>
              <Separator size="tiny" />
              <Action onPress={() => updateInfo('PRESENTATION')}>
                {presentation ? (
                  <Text preset="comment">{presentation}</Text>
                ) : (
                  <Text underline preset="paragraph">
                    Adicionar presentação
                  </Text>
                )}
              </Action>
            </ProfileContent>
          </ProfileBody>
          {imageUpload && (
            <View
              style={
                (StyleSheet.hairlineWidth,
                {bottom: 0, width: '100%', paddingLeft: 25, paddingRight: 25})
              }>
              <GuupActions
                noPadding
                loading={loading || imageLoading || uploading}
                leftAction={{
                  text: 'Cancelar',
                  onPress: () => setImageUpload(null),
                }}
                rightAction={{
                  text: 'Enviar foto',
                  onPress: sendProfilePhoto,
                }}
              />
            </View>
          )}
          {type === 'PUBLIC' && (
            <GuupMenuList
              padding
              menuItems={[
                {
                  text: 'Publicacoes',
                  // icon: 'news',
                  onPress: () =>
                    navigate('GuupPosts', {
                      owner: `${userProfile.uid}`,
                      type: user?.uid === id ? 'OWNER' : 'PUBLIC',
                    }),
                },
                {
                  text: 'Conteudos',
                  // icon: 'video',
                  onPress: () =>
                    navigate('GuupCourses', {
                      owner: `${userProfile.uid}`,
                      type: user?.uid === id ? 'OWNER' : 'PUBLIC',
                    }),
                },
              ]}
            />
          )}
        </ProfileBottom>
      </ProfileContainer>
      {
        <ProfileUserPicture
          as={FastImage}
          style={StyleSheet.absoluteFill}
          source={{
            uri: `${imageUpload ? imageUpload.source.uri : photoURL}`,
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      }
      <Modal
        visible={editModal}
        animationType="slide"
        presentationStyle="formSheet"
        onRequestClose={() => Alert.alert('Dismiss', 'On dismiss')}>
        <KeyboardBlock paddingPageSheet hasKeyboardDismiss={false}>
          <ProfileEditContainer>
            <ProfileEditHeader>
              <Text preset="subtitle">
                {R.cond([
                  [
                    R.equals(EInputs.DISPLAY_NAME),
                    () => 'Digite seu novo nome',
                  ],
                  [
                    R.equals(EInputs.PROFISSION),
                    () => 'Digite a sua profissão',
                  ],
                  [
                    R.equals(EInputs.PRESENTATION),
                    () => 'Digite uma breve presentação de você',
                  ],
                  [R.T, () => 'Todos'],
                ])(currentInput)}
              </Text>
            </ProfileEditHeader>
            <ProfileEditBody>
              <SmartForm
                {...{
                  register,
                  setValue,
                  errors,
                }}>
                <InputArea
                  autoFocus
                  maxLength={260}
                  editable={!loading}
                  {...R.cond([
                    [
                      R.equals(EInputs.DISPLAY_NAME),
                      () => ({
                        name: 'displayName',
                        placeholder: 'Digite seu nome aqui',
                      }),
                    ],
                    [
                      R.equals(EInputs.PROFISSION),
                      () => ({
                        name: 'profission',
                        placeholder: 'Digite a sua profissão aqui',
                      }),
                    ],
                    [
                      R.T,
                      () => ({
                        name: 'presentation',
                        placeholder:
                          'Digite uma breve presentação de você aqui',
                      }),
                    ],
                  ])(currentInput)}
                />
              </SmartForm>
            </ProfileEditBody>
            <ProfileEditFooter>
              <GuupActions
                loading={loading}
                leftAction={{
                  text: 'Cancelar',
                  onPress: () => toggleModal(),
                }}
                rightAction={{
                  text: 'Salvar',
                  onPress: handleSubmit(sendNewProfileInfo),
                }}
              />
            </ProfileEditFooter>
          </ProfileEditContainer>
        </KeyboardBlock>
      </Modal>
    </Container>
  );
};

export default Profile;
