import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../contexts/Auth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes(): JSX.Element {
  const { user } = useAuth();

  return <NavigationContainer>{user.id ? <AppRoutes /> : <AuthRoutes />}</NavigationContainer>;
}
