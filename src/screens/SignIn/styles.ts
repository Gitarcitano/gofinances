import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;
  padding: 16px;

  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: flex-end;
  align-items: center;
`;

export const TitleContainer = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(30)}px;

  text-align: center;
  color: ${({ theme }) => theme.colors.shape};

  margin-top: 48px;
`;

export const SignInTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;

  text-align: center;
  color: ${({ theme }) => theme.colors.shape};

  margin-top: 48px;
  margin-bottom: 80px;
`;

export const Footer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
