/* eslint-disable camelcase */
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import { AuthProvider, useAuth } from './src/contexts/Auth';
import theme from './src/global/styles/theme';
import { Routes } from './src/routes';

// import { AppRoutes } from './src/routes/app.routes';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  const { isLoadingUser } = useAuth();

  if (!fontsLoaded || isLoadingUser) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
