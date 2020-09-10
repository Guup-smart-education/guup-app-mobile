import React, {useContext} from 'react';
import AppRouter from './app.routes';
import AuthRouter from './auth.routes';
import AuthContext from './../contexts/auth';
import LoadingScreen from './../pages/Loading';

const Routes: React.FC = () => {
  const {appLoading, signed, user} = useContext(AuthContext);
  console.log([signed, user]);
  if (appLoading) {
    return <LoadingScreen />;
  }
  return signed ? <AppRouter /> : <AuthRouter />;
};

export default Routes;
