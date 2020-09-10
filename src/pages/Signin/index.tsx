import React, {useContext, useEffect} from 'react';
import AuthContext from './../../contexts/auth';
import {Separator, FormContainer, RowFullWidth} from './../../ui';
import {
  KeyboardBlock,
  GuupBot,
  GuupActions,
  SmartForm,
  SmartInput,
} from './../../components';
import nextId from 'react-id-generator';
import {PropsAuth} from './../../@types/auth.navigation';
import {ContainerInputs} from './_styled';
import {useForm} from 'react-hook-form';
import {SignInValidation} from './../../validations';
import {SigninFormData} from './../../@types/forms.data';
import FormSignIn from './../../forms/form.signin';

const SigninScreen: React.FC<PropsAuth> = ({navigation}) => {
  const {signIn, loading, goHome} = useContext(AuthContext);
  const {handleSubmit, register, setValue, errors} = useForm<SigninFormData>({
    validationSchema: SignInValidation,
  });

  const goOnboarding: () => void = () => {
    navigation.popToTop();
  };

  const handleSignin: (data: SigninFormData) => void = async (data) => {
    const response = await signIn(data);
    console.log('response -> ', response);
    navigation.navigate('AuthWaiting', {
      title: 'Fazendo magic',
      description:
        'Aguarde um momento ja ja vai receber um link mágico de acesso :)',
      actionBack: goHome,
    });
  };

  useEffect(() => {
    register({name: 'email'});
  }, [register]);

  return (
    <KeyboardBlock hasKeyboardDismiss={false}>
      <FormContainer>
        <Separator size="bigger" />
        <RowFullWidth padding={50}>
          <GuupBot message="Digita teu e-mail e em seguida te enviarei um link para redefinir senha" />
        </RowFullWidth>
        <Separator size="bigger" />
        <ContainerInputs>
          <SmartForm {...{register, setValue, errors}}>
            {FormSignIn.map((i) => {
              return (
                <SmartInput
                  {...i}
                  editable={!loading}
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
          text: 'Enviar',
          onPress: handleSubmit(handleSignin),
          // onPress: () =>
          //   navigation.navigate('AuthWaiting', {
          //     title: 'Fazendo magic',
          //     description:
          //       'Aguarde um momento ja ja vai receber um link mágico de acesso :)',
          //   }),
        }}
      />
    </KeyboardBlock>
  );
};

export default SigninScreen;
