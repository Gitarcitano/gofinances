import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { VictoryPie } from 'victory-native';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { Container, Header, Title, Content, ChartContainer } from './styles';

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
  total: number;
  totalFormatted: string;
  color: string;
  percentFormatted: string;
  percent: number;
}

export function Summary(): JSX.Element {
  const [totalByCategories, setTotalByCategories] = useState<Category[]>([]);
  const { colors } = useTheme();

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
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = (categorySum / totalOutcomes) * 100;
        const percentFormatted = `${percent.toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
          percentFormatted,
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
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: { fontSize: RFValue(18), fontWeight: 'bold', fill: colors.shape },
            }}
            labelRadius={80}
            x="percentFormatted"
            y="total"
          />
        </ChartContainer>
        {totalByCategories.map(category => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={category.totalFormatted}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
}
