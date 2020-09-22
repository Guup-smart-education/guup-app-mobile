import R from 'ramda';
import React, {useState, useContext, useEffect} from 'react';
import AuthContext from './../../contexts/auth';
import {Separator, FormContainer, RowFullWidth, Input} from './../../ui';
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
  const [siginError, setSigninError] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [botMessage, setBotMessage] = useState<string>(
    'Digita teu e-mail e em seguida te enviarei um ticket de acesso 😉',
  );
  const {countDown} = useCountDown(siginDisable, setSigninDisable);
  const {handleSubmit, register, setValue, errors, getValues} = useForm<
    SigninFormData
  >({
    validationSchema: SignInValidation,
  });

  const goOnboarding: () => void = () => {
    navigation.popToTop();
  };

  const handleSignin: (data: SigninFormData) => void = (data) => {
    setSigninError(false);
    requestAccess({variables: {...data}});
  };

  useEffect(() => {
    register({name: 'email'});
  }, [register]);

  useEffect(() => {
    if (signinData) {
      const {authRequestAccess} = signinData;
      if (
        authRequestAccess.__typename === 'ErrorResponse' &&
        R.includes(attempts, [2, 5])
      ) {
        setBotMessage(
          attempts === 2
            ? 'Eu acho que você poderia tentar com outro e-mail'
            : 'Porfavor, tente dentro de 2 minutos',
        );
        attempts === 5 && setSigninDisable(30);
        setAttempts(attempts + 1);
        setSigninError(true);
      } else if (authRequestAccess.__typename === 'ErrorResponse') {
        setBotMessage(authRequestAccess.error.message || 'Aconteceu um erro');
        setAttempts(attempts + 1);
        setSigninError(true);
      } else if (authRequestAccess.__typename === 'RequestAccess') {
        const email = getValues('email');
        const {expireIn} = authRequestAccess;
        navigation.navigate('AuthAccess', {email, expireIn});
      }
    } else if (signinError) {
      setBotMessage(signinError.message || 'Aconteceu um erro');
      setAttempts(attempts + 1);
      setSigninError(true);
    }
  }, [signinData, signinError, getValues, setBotMessage, navigation]);

  return (
    <KeyboardBlock hasKeyboardDismiss={false}>
      <FormContainer>
        <Separator size="bigger" />
        <RowFullWidth padding={50}>
          <GuupBot message={botMessage} />
        </RowFullWidth>
        <Separator size="bigger" />
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
    </KeyboardBlock>
  );
};

export default SigninScreen;
