import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../contexts/Auth';
import {
  Container,
  Header,
  TitleContainer,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

export function SignIn(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      Alert.alert('Não foi possível conectar a conta Google');
    }
  }
  async function handleSignInWithApple() {
    setIsLoading(true);
    try {
      await signInWithApple();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      Alert.alert('Não foi possível conectar a conta Apple');
    }
  }

  return (
    <Container>
      <Header>
        <TitleContainer>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>Controle suas finanças de forma muito simples</Title>
        </TitleContainer>
        <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            Svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              title="Entrar com Apple"
              Svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>

        {isLoading && <ActivityIndicator color={colors.shape} style={{ marginTop: 16 }} />}
      </Footer>
    </Container>
  );
}
