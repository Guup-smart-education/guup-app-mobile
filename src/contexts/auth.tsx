import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {User, UserProfile} from './../graphql/types.d';

interface IProvisionAccess {
  user: string;
  accessToken: string;
}
interface AuthContextData {
  appLoading: boolean;
  signed: boolean;
  isSignOut: boolean;
  provisionAccess: IProvisionAccess;
  accessToken: string | null;
  user: User | null;
  siginDisable: number;
  signOut: () => void;
  setSession: (user: string, accessToken: string) => void;
  setProvissionAccess: (user: string, accessToken: string) => void;
  setSigninDisable: (locked: number) => void;
  setUpdateSession: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  // States
  const [user, setUser] = useState<object | null>(null);
  const [provisionAccess, setProvisionAccess] = useState<IProvisionAccess>({});
  const [signed, setSigned] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [appLoading, setAppLoading] = useState<boolean>(true);
  const [siginDisable, setSiginDisable] = useState<number>(0);
  const [isSignOut, setIsSignOut] = useState<boolean>(0);
  // Effects
  useEffect(() => {
    (async () => {
      const storageUser = await AsyncStorage.getItem('@GUUPAuth:user');
      const storageToken = await AsyncStorage.getItem('@GUUPAuth:token');
      const disable = await AsyncStorage.getItem('@GUUPAuth:signinDisable');
      console.log('storageUser: ', storageUser);
      console.log('storageToken: ', storageToken);
      console.log('disable: ', disable);
      if (disable) {
        // TODO: Adicionar limitador de solicitudes
        setSiginDisable(parseInt(disable, 0));
      }
      if (storageUser && storageToken) {
        const userParse = JSON.parse(storageUser);
        console.log('useEffect storageUser', userParse);
        console.log('useEffect storageToken', storageToken);
        setUser(userParse);
        setAccessToken(storageToken);
        setSigned(true);
      }
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, 2000),
      );
      setAppLoading(false);
    })();
  }, [signed]);
  const signOut = async () => {
    setIsSignOut(true);
    setTimeout(() => {
      AsyncStorage.clear().then(() => {
        setUser(null);
        setAccessToken(null);
        setSigned(false);
        setIsSignOut(false);
      });
    }, 3000);
  };
  const setSession = (user: string, accessToken: string) => {
    AsyncStorage.setItem('@GUUPAuth:user', user);
    AsyncStorage.setItem('@GUUPAuth:token', accessToken);
    setSigned(true);
  };
  const setUpdateSession = (profile: UserProfile) => {
    const newUser: User = {...user, profile};
    setUser(newUser);
    AsyncStorage.setItem('@GUUPAuth:user', JSON.stringify(newUser));
  };
  const setProvissionAccess = (user: string, accessToken: string) => {
    setProvisionAccess({
      user,
      accessToken,
    });
  };
  const setSigninDisable = (locked: number) => {
    const count = locked >= 0 ? locked : 30;
    if (count < 0) {
      AsyncStorage.removeItem('@GUUPAuth:signinDisable');
    } else {
      AsyncStorage.setItem('@GUUPAuth:signinDisable', `${count}`);
    }
    setSiginDisable(count);
  };
  return (
    <AuthContext.Provider
      value={{
        appLoading,
        signed,
        isSignOut,
        provisionAccess,
        user,
        accessToken,
        siginDisable,
        signOut,
        setSession,
        setProvissionAccess,
        setSigninDisable,
        setUpdateSession,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
