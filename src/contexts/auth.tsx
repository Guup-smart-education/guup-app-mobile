import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {authSignin, authSignup} from './../services/auth';
import {SigninFormData, SignupFormData} from './../@types/forms.data';
import {WaitingPage} from './../@enum/waiting.enum';

interface AuthContextData {
  appLoading: boolean;
  loading: boolean;
  waitingPage: keyof typeof WaitingPage | undefined;
  signed: boolean;
  user: object | null;
  signIn: (data: SigninFormData) => Promise<void>;
  signUp: (data: SignupFormData) => Promise<void>;
  signOut: () => void;
  goHome: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<object | null>(null);
  const [appLoading, setAppLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [waitingPage, setWaitingPage] = useState<keyof typeof WaitingPage>();

  useEffect(() => {
    (async () => {
      const storageUser = await AsyncStorage.getItem('@GUUPAuth:user');
      const storageToken = await AsyncStorage.getItem('@GUUPAuth:token');
      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, 2000),
      );
      setAppLoading(false);
    })();
  }, []);
  const signIn = async (data: SigninFormData) => {
    setLoading(true);
    const response = await authSignin();
    setLoading(false);
    return response;
  };
  const signUp = async (data: SignupFormData) => {
    setLoading(true);
    await authSignup();
    setWaitingPage('signup');
    setLoading(false);
  };
  const signOut = () => {
    AsyncStorage.clear().then(() => setUser(null));
  };
  const goHome = async () => {
    setLoading(true);
    const response = {
      user: {name: 'Kelvin Arnold', email: 'kelvin.arnold@guup.com'},
      token: 'kelsjdjsdi293s=sksdamccl-asd-33232',
    };
    setUser(response.user);
    await AsyncStorage.setItem('@GUUPAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@GUUPAuth:token', response.token);
    setLoading(false);
  };
  return (
    <AuthContext.Provider
      value={{
        appLoading,
        loading,
        waitingPage,
        signed: !!user,
        user,
        signIn,
        signOut,
        signUp,
        goHome,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
