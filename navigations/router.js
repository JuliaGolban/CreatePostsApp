import React from 'react';
import { AuthStackNav } from './AuthStack';
import { MainStackNav } from './MainStack';

export const useRoute = isAuth => {
  if (!isAuth) {
    return <AuthStackNav />;
  }
  return <MainStackNav />;
};
