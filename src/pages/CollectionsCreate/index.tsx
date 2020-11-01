/* eslint-disable react-native/no-inline-styles */
import R from 'ramda';
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  Container,
  Text,
  InputArea,
  Separator,
  RowFullWidth,
  Icon,
  Link,
  Action,
} from './../../ui/';
import {
  KeyboardBlock,
  GuupHeader,
  GuupFooter,
  SmartForm,
  Carousel,
} from './../../components';
import {CreateHeader, CreateBody, FooterLabels} from './_styled';
import nextId from 'react-id-generator';
import {CollectionCreateValidation} from './../../validations';
import {ContentCreateFormData} from './../../@types/forms.data';
import {FormCollectionCreate} from './../../forms';
import {CollectionCreatePropsApp} from './../../@types/app.navigation';
import {SmartInputProps} from './../../@types/smart.input';
import {
  PathAccess,
  useCreatePathMutation,
  PathStatus,
} from './../../graphql/types.d';
import {Alert} from 'react-native';

const ContentCreate: React.FC<CollectionCreatePropsApp> = ({
  navigation: {goBack, navigate},
}) => {
  const formContent = FormCollectionCreate;
  const validationSchema = CollectionCreateValidation;
  const defaultValues = formContent.reduce(
    (acc, next) => ({...acc, [next.name]: undefined}),
    {},
  );
  const [isPublic, setIsPublic] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<SmartInputProps>(
    formContent[0],
  );
  const [createPath, {loading, data, error}] = useCreatePathMutation();
  const [step, setStep] = useState(0);
  const {register, setValue, errors, getValues} = useForm<
    ContentCreateFormData
  >({
    validationSchema,
    validateCriteriaMode: 'all',
    defaultValues,
  });
  const formLength = formContent.length;

  // Effects
  useEffect(() => {
    register({name: 'title'});
    register({name: 'description'});
  }, [register, formContent]);

  useEffect(() => {
    if (data?.createPath?.__typename === 'ErrorResponse') {
      Alert.alert('Aconteceu um erro', `${data?.createPath.error.message}`);
    } else if (data?.createPath?.__typename === 'CreatePath') {
      Alert.alert('Parabens!!', 'Colleção criada com sucesso');
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
  // End effects

  // handlers
  const nextStep: () => void = () => {
    if (step === formContent.length - 1) {
      return false;
    }
    const newStep = step + 1;
    setCurrentQuestion(formContent[newStep]);
    setStep(newStep);
  };
  const prevStep: () => void = () => {
    if (step === 0) {
      goBack();
      return false;
    }
    setStep(step - 1);
    const newStep = step - 1;
    setCurrentQuestion(formContent[newStep]);
    setStep(newStep);
  };
  const sendCollection = () => {
    const {description = '', title = ''} = getValues();
    createPath({
      variables: {
        path: {
          title,
          description,
        },
        access: isPublic ? PathAccess.ForEveryone : PathAccess.LimitAccess,
        status: PathStatus.Waiting,
      },
    });
  };
  // End handlers
  return (
    <Container safe light>
      <KeyboardBlock hasKeyboardDismiss>
        <CreateHeader>
          <GuupHeader
            leftRenderIntem={
              <Action onPress={() => !loading && goBack()}>
                <Icon source="arrow" />
              </Action>
            }
            centerRenderItem={
              <Text preset="comment" bold>
                Coleção
              </Text>
            }
            rightRenderIntem={
              <Action onPress={() => !loading && setIsPublic(!isPublic)}>
                <Icon
                  source={isPublic ? 'unlock' : 'lock'}
                  backColor="veryLigthGrey"
                />
              </Action>
            }
          />
        </CreateHeader>
        <CreateBody>
          <Separator size="small" />
          <RowFullWidth padding={25} style={{width: '75%'}}>
            <Icon source="guup" size="small" />
            <Separator size="tiny" />
            <Text preset="subtitle">{currentQuestion.title}</Text>
          </RowFullWidth>
          <Separator size="medium" />
          <Carousel
            size={formContent.length}
            showDots={false}
            enabled={false}
            page={step}
            paging>
            <SmartForm
              {...{
                register,
                setValue,
                errors,
                currentInput: step,
              }}>
              {formContent.map((input: SmartInputProps) => {
                return (
                  <InputArea
                    {...input}
                    editable={!loading}
                    key={nextId('input-create-content-')}
                    style={{height: '100%'}}
                  />
                );
              })}
            </SmartForm>
          </Carousel>
        </CreateBody>
        <Separator size="stroke" />
        <GuupFooter color="ligth">
          <FooterLabels>
            <Link disable={loading} color="dark" onPress={() => prevStep()}>
              {step === 0 ? 'Fechar' : 'Anterior'}
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
      </KeyboardBlock>
    </Container>
  );
};

export default ContentCreate;
