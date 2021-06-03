import React from 'react';

import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Button, Title, Icon } from './styles';

interface Props extends RectButtonProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

export function TransactionTypeButton({ type, title, isActive, ...rest }: Props): JSX.Element {
  return (
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
