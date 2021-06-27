import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer,
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  income: HighlightProps;
  outcome: HighlightProps;
  total: string;
}

export function Dashboard(): JSX.Element {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  async function loadTransactions() {
    const transactionKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(transactionKey);
    const localTransactions = response ? JSON.parse(response) : [];

    let totalIncome = 0;
    let totalOutcome = 0;

    const transactionsFormatted: DataListProps[] = localTransactions.map((item: DataListProps) => {
      if (item.type === 'positive') {
        totalIncome += Number(item.amount);
      } else {
        totalOutcome += Number(item.amount);
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      };
    });

    const total = totalIncome - totalOutcome;

    setTransactions(transactionsFormatted);
    setHighlightData({
      income: {
        amount: totalIncome.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      outcome: {
        amount: totalOutcome.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      total: total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/44866256?v=4',
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>Giovanne</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData?.income?.amount}
              lastTransaction="Última entrada dia 13 de abril"
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData?.outcome?.amount}
              lastTransaction="Última saída dia 03 de abril"
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData?.total}
              lastTransaction="01 à 16 de abril"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
