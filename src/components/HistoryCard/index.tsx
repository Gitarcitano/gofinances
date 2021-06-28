import React from 'react';

import { Container, Title, Amount } from './styles';

export interface HistoryCardProps {
  color: string;
  title: string;
  amount: string;
}

export function HistoryCard({ color, title, amount }: HistoryCardProps): JSX.Element {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
