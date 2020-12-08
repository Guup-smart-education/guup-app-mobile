/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import {Alert} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import AuthContext from './../../contexts/auth';
import {
  Separator,
  FormContainer,
  RowFullWidth,
  Text,
  Container,
} from './../../ui';
import {
  KeyboardBlock,
  GuupActions,
  SmartForm,
  SmartInput,
  GuupHeader,
} from './../../components';
import nextId from 'react-id-generator';
import {PropsAuth} from './../../@types/auth.navigation';
import {ContainerInputs} from './_styled';
import {useForm} from 'react-hook-form';
import {SignInValidation} from './../../validations';
import {SigninFormData} from './../../@types/forms.data';
import FormSignIn from './../../forms/form.signin';
import {useAuthRequestAccessMutation} from './../../graphql/types.d';
import {useCountDown} from './Hooks';

const SigninScreen: React.FC<PropsAuth> = ({navigation}) => {
  // Mutation
  const [
    requestAccess,
    {data: signinData, error: signinError, loading},
  ] = useAuthRequestAccessMutation();
  // Context
  const {siginDisable, setSigninDisable} = useContext(AuthContext);
  const [attempts, setAttempts] = useState<number>(0);
  const {countDown} = useCountDown(siginDisable, setSigninDisable);
  const {handleSubmit, register, setValue, errors, getValues} = useForm<
    SigninFormData
  >({
    validationSchema: SignInValidation,
  });

  const goOnboarding: () => void = () => {
    navigation.popToTop();
  };

  const handleSignin: (data: SigninFormData) => void = ({email}) => {
    // setSigninError(false);
    requestAccess({
      variables: {
        email,
      },
    });
  };

  useEffect(() => {
    register({name: 'email'});
  }, [register]);

  useEffect(() => {
    if (
      signinData?.authRequestAccess.__typename === 'ErrorResponse' &&
      R.includes(attempts, [2, 5])
    ) {
      attempts === 2
        ? Alert.alert(
            'Oops!!',
            'Eu acho que você poderia tentar com outro e-mail',
          )
        : Alert.alert('Oops!!', 'Porfavor, tente dentro de 2 minutos');
      attempts === 5 && setSigninDisable(30);
      setAttempts(attempts + 1);
    } else if (signinData?.authRequestAccess.__typename === 'ErrorResponse') {
      Alert.alert(
        'Aconteceu um erro 😞',
        signinData.authRequestAccess.error.message || 'Aconteceu um erro',
      );
      setAttempts(attempts + 1);
    } else if (signinData?.authRequestAccess.__typename === 'RequestAccess') {
      const email = getValues('email');
      const {expireIn} = signinData.authRequestAccess;
      navigation.navigate('AuthAccess', {email, expireIn});
    }
  }, [signinData]);

  useEffect(() => {
    if (signinError) {
      Alert.alert('Erro inesperado 😱', signinError.message);
      setAttempts(attempts + 1);
      // setSigninError(true);
    }
  }, [signinError]);

  return (
    <KeyboardBlock hasKeyboardDismiss={false}>
      <Container safe light>
        <RowFullWidth padding={25}>
          <GuupHeader hasGuupIcon />
        </RowFullWidth>
        <FormContainer>
          <RowFullWidth padding={50}>
            <Separator size="large" />
            <Text preset="header">Digita teu e-mail</Text>
            <Separator size="medium" />
            <Text preset="paragraph">
              Para acessar precisaremos de um e-mail e enseguida te enviaremos
              um código de acesso
            </Text>
          </RowFullWidth>
          <Separator size="large" />
          <ContainerInputs>
            <SmartForm {...{register, setValue, errors}}>
              {FormSignIn.map((i) => {
                return (
                  <SmartInput
                    {...i}
                    editable={!loading || !!siginDisable}
                    key={nextId('input-signup-')}
                  />
                );
              })}
            </SmartForm>
          </ContainerInputs>
        </FormContainer>
        <GuupActions
          loading={loading}
          leftAction={{text: 'Cancel', onPress: goOnboarding}}
          rightAction={{
            text: siginDisable ? countDown : 'Enviar',
            onPress: handleSubmit(handleSignin),
            disable: !!siginDisable,
          }}
        />
      </Container>
    </KeyboardBlock>
  );
};

export default SigninScreen;
