import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { Container, Header, Title, Content } from './styles';

interface Transaction {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Category {
  key: string;
  name: string;
  total: string;
  color: string;
  percent: string;
}

export function Summary(): JSX.Element {
  const [totalByCategories, setTotalByCategories] = useState<Category[]>([]);

  async function loadData() {
    const transactionKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(transactionKey);
    const formattedResponse = response ? JSON.parse(response) : [];

    const outcomes = formattedResponse.filter(
      (transaction: Transaction) => transaction.type === 'negative',
    );

    const totalOutcomes = outcomes.reduce((accumulator: number, transaction: Transaction) => {
      return accumulator + Number(transaction.amount);
    }, 0);

    const totalByCategory: Category[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      outcomes.forEach((outcome: Transaction) => {
        if (outcome.category === category.key) {
          categorySum += Number(outcome.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const percent = ((categorySum / totalOutcomes) * 100).toFixed(0);

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {totalByCategories.map(category => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={category.total}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
}
