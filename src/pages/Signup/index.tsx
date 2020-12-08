import React, {useContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import nextId from 'react-id-generator';
import AuthContext from './../../contexts/auth';
import {Separator, FormContainer, RowFullWidth} from './../../ui';
import {
  KeyboardBlock,
  GuupBot,
  GuupActions,
  Carousel,
  SmartForm,
  SmartInput,
} from './../../components';
import {ContainerInputs} from './_styled';
import {PropsAuth} from './../../@types/auth.navigation';
import {useForm} from 'react-hook-form';
import {SignUpValidation} from './../../validations';
import {SignupFormData} from './../../@types/forms.data';
import FormSignup from './../../forms/form.signup';
import {EnumUserRole, useAuthSignUpMutation} from './../../graphql/types.d';

const SignSteps =
  'Opa!! fala teu nome para mim, eu gostaria de saber quem é você';

const SignUpScreen: React.FC<PropsAuth> = ({navigation}) => {
  const {
    provisionAccess: {user},
    setSession,
  } = useContext(AuthContext);
  const [
    requestSignUp,
    {data: signupData, error: signupError, loading},
  ] = useAuthSignUpMutation();
  const {handleSubmit, register, setValue, errors} = useForm<SignupFormData>({
    validationSchema: SignUpValidation,
    validateCriteriaMode: 'all',
    defaultValues: {
      username: undefined,
      phone: undefined,
    },
  });
  const formLength = FormSignup.length;
  const [botMessage, setBotMessage] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const nextStep: () => void = () => {
    if (step === FormSignup.length - 1) {
      return false;
    }
    setStep(step + 1);
  };
  const prevStep: () => void = () => {
    if (step === 0) {
      navigation.navigate('AuthOnboarding');
      return false;
    }
    setStep(step - 1);
  };
  const signUp = ({phone, username}: SignupFormData) => {
    requestSignUp({
      variables: {
        email: user,
        phone,
        username,
        role: EnumUserRole.Common,
      },
    });
  };
  useEffect(() => {
    register({name: 'username'});
    register({name: 'phone'});
  }, [register]);

  useEffect(() => {
    if (signupData) {
      const {authSignUp} = signupData;
      if (authSignUp.__typename === 'ErrorResponse') {
        Alert.alert('Aconteceu um erro!', `${authSignUp.error.message}`);
      } else if (authSignUp.__typename === 'SignUpSuccess') {
        console.log('authSignUp.user: ', authSignUp.user);
        setSession(
          JSON.stringify(authSignUp.user),
          authSignUp.access?.token || '',
        );
      }
    } else if (signupError) {
      Alert.alert('Oops!!', `${signupError.message}`);
    }
  }, [signupData, signupError, setSession]);

  return (
    <KeyboardBlock hasKeyboardDismiss={true}>
      <FormContainer>
        <Separator size="bigger" />
        <RowFullWidth padding={50}>
          <GuupBot message={botMessage || SignSteps} />
        </RowFullWidth>
        <Separator size="bigger" />
        <ContainerInputs>
          <Carousel
            size={FormSignup.length}
            showDots={false}
            enabled={false}
            page={step}
            paging>
            <SmartForm {...{register, setValue, errors, currentInput: step}}>
              {FormSignup.map((i) => {
                return (
                  <SmartInput
                    {...{...i}}
                    editable={!loading}
                    key={nextId('input-signup-')}
                  />
                );
              })}
            </SmartForm>
          </Carousel>
        </ContainerInputs>
      </FormContainer>
      <GuupActions
        loading={loading}
        leftAction={{
          text: !step ? 'Cancel' : 'Anterior',
          onPress: prevStep,
        }}
        rightAction={{
          disable: false,
          text: step >= formLength - 1 ? 'Enviar' : 'Próximo',
          onPress: step >= formLength - 1 ? handleSubmit(signUp) : nextStep,
        }}
      />
    </KeyboardBlock>
  );
};

export default SignUpScreen;
