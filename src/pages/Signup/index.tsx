import React, {useContext, useState, useEffect} from 'react';
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

const SignSteps =
  'Opa!! fala teu nome para mim, eu gostaria de saber quem é você';

const SignUpScreen: React.FC<PropsAuth> = ({navigation}) => {
  const {signUp, loading} = useContext(AuthContext);
  const {handleSubmit, register, setValue, errors} = useForm<SignupFormData>({
    validationSchema: SignUpValidation,
    validateCriteriaMode: 'all',
    defaultValues: {
      username: undefined,
      email: undefined,
      phone: undefined,
    },
  });
  const [step, setStep] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
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

  useEffect(() => {
    register({name: 'username'});
    register({name: 'email'});
    register({name: 'phone'});
  }, [register]);

  useEffect(() => {
    const inp = FormSignup[step].name;
    console.log('Current input -> ', inp);
    console.log('Current errors -> ', errors);
    setCurrentInput(inp);
  }, [step]);

  return (
    <KeyboardBlock hasKeyboardDismiss={false}>
      <FormContainer>
        <Separator size="bigger" />
        <RowFullWidth padding={50}>
          <GuupBot message={SignSteps} />
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
          text: step === 2 ? 'Enviar' : 'Próximo',
          onPress: step === 2 ? handleSubmit(signUp) : nextStep,
        }}
      />
    </KeyboardBlock>
  );
};

export default SignUpScreen;
