import R from 'ramda';
import React, {useState, useContext, useEffect} from 'react';
import {Alert, TextInput} from 'react-native';
import {
  Text,
  Separator,
  Container,
  Icon,
  Link,
  Action,
  InputArea,
} from './../../ui';
import {
  GuupHeader,
  Modal,
  KeyboardBlock,
  GuupActions,
  SmartForm,
} from './../../components';
import {ProfilePropsApp} from './../../@types/app.navigation';
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
} from './_styled';
import AuthContext from './../../contexts/auth';
import {
  useUpdateUserProfileMutation,
  User,
  UserProfile,
} from './../../graphql/types.d';
import {useForm} from 'react-hook-form';

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
  navigation: {goBack},
  route: {
    params: {type},
  },
}) => {
  const {user, setUpdateSession} = useContext(AuthContext);
  const [currentInput, setCurrentInput] = useState<keyof typeof EInputs>();
  const [editModal, togleEditModal] = useState<boolean>(false);
  const [
    updateProfile,
    {data, error, loading},
  ] = useUpdateUserProfileMutation();
  const {register, errors, getValues, setValue, handleSubmit} = useForm<
    IUpdateForm
  >();
  // Handlers
  const toggleModal = () => togleEditModal(!editModal);
  const updateInfo: (input: keyof typeof EInputs) => void = (input) => {
    toggleModal();
    setCurrentInput(input);
  };
  // Effects
  useEffect(() => {
    if (data?.updateUserProfile?.__typename === 'UpdateProfile') {
      toggleModal();
    } else if (data?.updateUserProfile?.__typename === 'ErrorResponse') {
      Alert.alert('Oops! 😅', `${data.updateUserProfile.error.message}`, [
        {
          text: 'Ok',
          onPress: () => toggleModal(),
        },
      ]);
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      Alert.alert('Oops! 😅', `${error.message}`, [
        {
          text: 'Ok',
          onPress: () => toggleModal(),
        },
      ]);
    }
  }, [error]);
  // End effects
  // End handle
  const sendNewProfileInfo: (profileData: IUpdateForm) => void = (
    profileData,
  ) => {
    const newProfile: UserProfile = {
      ...user?.profile,
      ...R.filter((item) => !!item, {
        ...profileData,
      }),
    };
    setUpdateSession(newProfile);
    updateProfile({
      variables: {
        ...newProfile,
      },
    });
  };
  useEffect(() => {
    [
      'displayName',
      'photoURL',
      'thumbnailURL',
      'profission',
      'presentation',
    ].forEach((name) => register({name, options: {required: false}}));
  }, [register]);
  return (
    <Container>
      <ProfileContainer>
        <ProfileHeader>
          <GuupHeader
            hasBack
            onLeftPress={() => goBack()}
            rightRenderIntem={
              <Link
                color="ligth"
                onPress={() => Alert.alert('Perfil', 'Atualizar perfil')}>
                Foto de perfil
              </Link>
            }
          />
        </ProfileHeader>
        <ProfileBody>
          <ProfileuserData>
            <Action onPress={() => updateInfo('DISPLAY_NAME')}>
              <Text preset="title" color="ligth">
                {user?.displayName}
              </Text>
            </Action>
            <Separator size="lili" />
            <Action onPress={() => updateInfo('PROFISSION')}>
              <Text preset="comment" color="ligth" underline>
                {user?.profission || 'Adicionar uma profissão'}
              </Text>
            </Action>
          </ProfileuserData>
          <ProfileContent>
            <Separator size="medium" />
            <Text preset="label" color="darkGrey">
              Apresentação
            </Text>
            <Separator size="tiny" />
            <Action onPress={() => updateInfo('PRESENTATION')}>
              {user?.profile?.presentation ? (
                <Text preset="comment">{user?.profile?.presentation}</Text>
              ) : (
                <Text underline preset="paragraph">
                  Adicionar presentação
                </Text>
              )}
            </Action>
          </ProfileContent>
        </ProfileBody>
      </ProfileContainer>
      <ProfileUserPicture source={{uri: `${user?.photoURL}`}} />
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
