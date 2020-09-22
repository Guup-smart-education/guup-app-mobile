import R from 'ramda';
import React, {useEffect, useState, useContext} from 'react';
import AuthContext from './../../contexts/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {Separator, FormContainer, RowFullWidth, Text} from './../../ui';
import {
  KeyboardBlock,
  GuupBot,
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

const SigninScreen: React.FC<PropsAuth> = ({
  navigation,
  route: {
    params: {email},
  },
}) => {
  const {setSession, setProvissionAccess} = useContext(AuthContext);
  const [custonExpire, setCustonExpire] = useState<number>(120);
  const {countDown, resetCountDown} = useCountDown(custonExpire);
  const [bootMessage, setBootMessage] = useState<string>(
    `Digite o token de accesso que acabamos de te enviar para ${email}`,
  );
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
        setBootMessage(authSignIn.error.message || 'Oops!! Aconteceu um erro');
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
        navigation.navigate('AuthSignUp');
      }
    } else if (signinError) {
      setBootMessage('Oops!! Aconteceu um erro, tenta novamente');
    }
  }, [signinData, signinError]);

  useEffect(() => {
    if (accessData) {
      const {authRequestAccess} = accessData;
      if (authRequestAccess.__typename === 'ErrorResponse') {
        setBootMessage(
          authRequestAccess.error.message || 'Oops!! Aconteceu um erro',
        );
      } else if (authRequestAccess.__typename === 'RequestAccess') {
        setCustonExpire(120);
        resetCountDown();
        setBootMessage(
          authRequestAccess.success?.message || 'Eba!!! Deu tudo certo',
        );
      }
    } else if (accessError) {
      setBootMessage('Oops!! Aconteceu um erro, tenta novamente');
    }
  }, [accessData, accessError]);
  return (
    <KeyboardBlock hasKeyboardDismiss={false}>
      <FormContainer>
        <Separator size="bigger" />
        <RowFullWidth padding={50}>
          <GuupBot message={bootMessage} />
        </RowFullWidth>
        <Separator size="bigger" />
        <ContainerInputs>
          <InputToken onSetValue={(token: string) => setTokenAccess(token)} />
          <ExpireTime>
            {parseInt(R.replace(/:/g, '', countDown), 0) ? (
              <Text preset="label" color="greyBrown">
                Solicitar novo token em {countDown}
              </Text>
            ) : (
              <TouchableWithoutFeedback
                onPress={() => requestAccess({variables: {email}})}>
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
    </KeyboardBlock>
  );
};

export default SigninScreen;
