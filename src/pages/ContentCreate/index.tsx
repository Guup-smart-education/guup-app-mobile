/* eslint-disable react-native/no-inline-styles */
import R from 'ramda';
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/core';
import {
  Container,
  Text,
  InputArea,
  FormContainer,
  Separator,
  RowFullWidth,
  Action,
  Icon,
  Link,
  FooterPatch,
  HeaderPatch,
} from './../../ui/';
import {
  KeyboardBlock,
  GuupActions,
  GuupUpload,
  GuupHeader,
  GuupFooter,
  SmartForm,
  Carousel,
} from './../../components';
import {
  CreateHeader,
  CreateBody,
  CreateLockAction,
  FooterLabels,
} from './_styled';
import nextId from 'react-id-generator';
import {ContentCreateValidation} from './../../validations';
import {ContentCreateFormData} from './../../@types/forms.data';
import {FormContentCreate} from './../../forms';
import {ContentCreateScreenNavigationProp} from './../../@types/app.navigation';
import {SmartInputProps, EInput} from './../../@types/smart.input';
import {PathAccess, useCreatePathMutation} from './../../graphql/types.d';
import {Alert} from 'react-native';

const ContentCreate: React.FC = () => {
  const navigation = useNavigation<ContentCreateScreenNavigationProp>();
  const [isPublic, setIsPublic] = useState(false);
  const [isFooterPatch, setFooterPatch] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState<SmartInputProps>(
    FormContentCreate[0],
  );
  const [createPath, {loading, data, error}] = useCreatePathMutation();
  const [step, setStep] = useState(0);
  const {register, setValue, errors, getValues} = useForm<
    ContentCreateFormData
  >({
    validationSchema: ContentCreateValidation,
    validateCriteriaMode: 'all',
    defaultValues: {
      collection: undefined,
      description: undefined,
    },
  });
  const formLength = FormContentCreate.length;

  // Effects
  useEffect(() => {
    register({name: 'collection'});
    register({name: 'description'});
    // register({name: 'photo'});
  }, [register]);

  useEffect(() => {
    if (data?.createPath?.__typename === 'ErrorResponse') {
      Alert.alert('Aconteceu um erro', `${data?.createPath.error.message}`);
    } else if (data?.createPath?.__typename === 'CreatePath') {
      Alert.alert('Parabens!!', 'Colleção criada com sucesso');
    }
  }, [data, error]);
  // End effects

  // handlers
  const nextStep: () => void = () => {
    if (step === FormContentCreate.length - 1) {
      return false;
    }
    const newStep = step + 1;
    setCurrentQuestion(FormContentCreate[newStep]);
    setStep(newStep);
  };
  const prevStep: () => void = () => {
    if (step === 0) {
      navigation.goBack();
      return false;
    }
    setStep(step - 1);
    const newStep = step - 1;
    setCurrentQuestion(FormContentCreate[newStep]);
    setStep(newStep);
  };
  const sendCollection = () => {
    const {description = '', collection = ''} = getValues();
    createPath({
      variables: {
        path: {
          title: collection,
          description,
        },
        access: isPublic ? PathAccess.ForEveryone : PathAccess.LimitAccess,
      },
    });
  };
  // End handlers
  return (
    <KeyboardBlock hasKeyboardDismiss={false}>
      <Container safe light>
        <HeaderPatch />
        <CreateHeader>
          <GuupHeader
            leftRenderIntem={
              <Action onPress={() => !loading && navigation.goBack()}>
                <Icon source="arrow" />
              </Action>
            }
            rightRenderIntem={
              <Action onPress={() => !loading && setIsPublic(!isPublic)}>
                <CreateLockAction>
                  {/* <Text bold preset="label">
                    {isPublic ? 'Coleção pública' : 'Coleção privada'}
                  </Text> */}
                  <Icon
                    source={isPublic ? 'unlock' : 'lock'}
                    backColor="veryLigthGrey"
                  />
                </CreateLockAction>
              </Action>
            }
          />
        </CreateHeader>
        <CreateBody>
          <Separator size="small" />
          <RowFullWidth padding={25} style={{width: '75%'}}>
            <Text preset="subtitle">{currentQuestion.title}</Text>
          </RowFullWidth>
          <Separator size="medium" />
          <Carousel
            size={FormContentCreate.length}
            showDots={false}
            enabled={false}
            page={step}
            paging>
            <SmartForm
              {...{register, setValue, errors, currentInput: step}}
              autoFocus>
              {FormContentCreate.map((input: SmartInputProps) => {
                return R.cond([
                  [
                    R.equals(EInput.gallery),
                    () => (
                      <GuupUpload
                        {...input}
                        autoFocus={false}
                        editable={!loading}
                        title="Selecione uma capa para a sua colecao!"
                        key={nextId('input-gallery-content-')}
                        onFocus={() => setFooterPatch(false)}
                        onBlur={() => setFooterPatch(true)}
                      />
                    ),
                  ],
                  [
                    R.T,
                    () => (
                      <InputArea
                        {...input}
                        autoFocus
                        editable={!loading}
                        key={nextId('input-create-content-')}
                        onFocus={() => setFooterPatch(false)}
                        onBlur={() => setFooterPatch(true)}
                      />
                    ),
                  ],
                ])(input.type);
              })}
            </SmartForm>
          </Carousel>
        </CreateBody>
        <Separator size="stroke" />
        <GuupFooter color="ligth">
          <FooterLabels>
            <Link disable={loading} color="dark" onPress={() => prevStep()}>
              {step > 0 ? 'Anterior' : 'Fechar'}
            </Link>
            <Link
              preset="solid"
              disable={
                loading ||
                R.isNil(getValues(currentQuestion.name)) ||
                R.isEmpty(getValues(currentQuestion.name))
              }
              loading={loading}
              onPress={() => {
                step >= formLength - 1 ? sendCollection() : nextStep();
              }}>
              {step >= formLength - 1 ? 'Publicar' : 'Próximo'}
            </Link>
          </FooterLabels>
        </GuupFooter>
        {isFooterPatch && <FooterPatch />}
      </Container>
    </KeyboardBlock>
  );
};

export default ContentCreate;
