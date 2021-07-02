import React from 'react';

import { RFValue } from 'react-native-responsive-fontsize';

// import AppleSvg from '../../assets/apple.svg'
// import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg';
import { Container, Header, TitleContainer, Title, SignInTitle, Footer } from './styles';

export function SignIn(): JSX.Element {
  return (
    <Container>
      <Header>
        <TitleContainer>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>Controle suas finanças de forma muito simples</Title>
        </TitleContainer>
        <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
      </Header>

      <Footer />
    </Container>
  );
}
