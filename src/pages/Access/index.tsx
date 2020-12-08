/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useEffect, useState, useContext} from 'react';
import AuthContext from './../../contexts/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Separator,
  FormContainer,
  RowFullWidth,
  Text,
  Icon,
  Container,
} from './../../ui';
import {
  KeyboardBlock,
  GuupHeader,
  GuupActions,
  InputToken,
} from './../../components';
import {PropsAuth} from './../../@types/auth.navigation';
import {ContainerInputs, ExpireTime} from './_styled';
import {
  useAuthSignInMutation,
  useAuthRequestAccessMutation,
} from './../../graphql/types.d';
import {useCountDown} from './Hooks';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Alert} from 'react-native';

const SigninScreen: React.FC<PropsAuth> = ({
  navigation,
  route: {
    params: {email},
  },
}) => {
  const {setSession, setProvissionAccess} = useContext(AuthContext);
  const [custonExpire, setCustonExpire] = useState<number>(120);
  const {countDown, resetCountDown} = useCountDown(custonExpire);
  const [tokenAccess, setTokenAccess] = useState<string>('');
  // Mutation
  const [
    requestSignin,
    {data: signinData, error: signinError, loading},
  ] = useAuthSignInMutation();

  const [
    requestAccess,
    {data: accessData, error: accessError, loading: accessLoading},
  ] = useAuthRequestAccessMutation();

  const goOnboarding: () => void = () => {
    navigation.popToTop();
  };

  useEffect(() => {
    if (signinData) {
      const {authSignIn} = signinData;
      if (authSignIn.__typename === 'ErrorResponse') {
        Alert.alert('ops!! Aconteceu um erro', `${authSignIn.error.message}`);
      } else if (
        authSignIn.__typename === 'SigInSuccess' &&
        authSignIn.success?.type === 'OLD_USERS'
      ) {
        setSession(
          JSON.stringify(authSignIn.user),
          authSignIn.access?.token || '',
        );
      } else if (
        authSignIn.__typename === 'SigInSuccess' &&
        authSignIn.success?.type === 'NEW_USERS'
      ) {
        setProvissionAccess(email, authSignIn.access?.token || '');
        Alert.alert('Um novo!!', `${authSignIn.success.message}`, [
          {
            text: 'Vamos lá',
            onPress: () => navigation.navigate('AuthSignUp'),
          },
        ]);
      }
    } else if (signinError) {
      Alert.alert('Oops!! Aconteceu um erro', `${signinError.message}`);
    }
  }, [signinData, signinError]);

  useEffect(() => {
    if (accessData) {
      const {authRequestAccess} = accessData;
      if (authRequestAccess.__typename === 'ErrorResponse') {
        Alert.alert(
          'Oops!! Aconteceu um erro',
          `${authRequestAccess.error.message}`,
        );
      } else if (authRequestAccess.__typename === 'RequestAccess') {
        setCustonExpire(120);
        resetCountDown();
        Alert.alert(
          'Eba!!! Deu tudo certo',
          `${authRequestAccess.success?.message}`,
        );
      }
    } else if (accessError) {
      Alert.alert('Oops!! Aconteceu um erro', `${accessError.message}`);
    }
  }, [accessData, accessError]);
  return (
    <KeyboardBlock hasKeyboardDismiss={false}>
      <Container safe light>
        <RowFullWidth padding={25}>
          <GuupHeader hasGuupIcon />
        </RowFullWidth>
        <FormContainer>
          <RowFullWidth padding={50}>
            <Separator size="large" />
            <Text preset="header">Digita o voucher</Text>
            <Separator size="medium" />
            <Text preset="paragraph">
              No teu e-mail você encontrará o código de acesso que há pouco
              tempo te enviamos.
            </Text>
          </RowFullWidth>
          <Separator size="large" />
          <ContainerInputs>
            <InputToken onSetValue={(token: string) => setTokenAccess(token)} />
            <ExpireTime>
              {parseInt(R.replace(/:/g, '', countDown), 0) ? (
                <Text preset="label" color="greyBrown">
                  Solicitar novo token em {countDown}
                </Text>
              ) : (
                <TouchableWithoutFeedback
                  onPress={() =>
                    !accessLoading && requestAccess({variables: {email}})
                  }>
                  <Text preset="label" color="primary" underline bold>
                    Solicitar novo token
                  </Text>
                </TouchableWithoutFeedback>
              )}
            </ExpireTime>
          </ContainerInputs>
        </FormContainer>
        <GuupActions
          loading={loading || accessLoading}
          leftAction={{text: 'Cancel', onPress: goOnboarding}}
          rightAction={{
            text: 'Enviar',
            onPress: () =>
              requestSignin({
                variables: {email, tokenAccess: parseInt(tokenAccess, 0)},
              }),
            disable: tokenAccess?.length < 4,
          }}
        />
      </Container>
    </KeyboardBlock>
  );
};

export default SigninScreen;
