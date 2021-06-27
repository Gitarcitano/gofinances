import React from 'react';

import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

export interface ButtonProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress, ...rest }: ButtonProps): JSX.Element {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
