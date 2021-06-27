import React from 'react';

import { Container, Category, Icon } from './styles';

export interface CategorySelectButtonProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: CategorySelectButtonProps): JSX.Element {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
