import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { useAuth } from '../../contexts/Auth';
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
  lastTransaction: string;
}

interface HighlightData {
  income: HighlightProps;
  outcome: HighlightProps;
  total: HighlightProps;
}

export function Dashboard(): JSX.Element {
  const { colors } = useTheme();
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
    const filteredTransactions = collection.filter(transaction => transaction.type === type);

    if (filteredTransactions.length === 0) {
      return 'Não há transações';
    }

    const lastTransaction = new Date(
      Math.max(...filteredTransactions.map(transaction => new Date(transaction.date).getTime())),
    );

    const parsedDate = lastTransaction.toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
    });

    if (filteredTransactions[0].type === 'positive') {
      return `Última entrada dia ${parsedDate}`;
    }
    return `Última saída dia ${parsedDate}`;
  }

  async function loadTransactions() {
    const transactionKey = `@gofinances:transactions_user:${user.id}`;
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

    setTransactions(transactionsFormatted);

    const lastIncomeTransaction = getLastTransactionDate(localTransactions, 'positive');
    const lastOutcomeTransaction = getLastTransactionDate(localTransactions, 'negative');
    const totalInterval = `01 a ${lastOutcomeTransaction}`;

    const total = totalIncome - totalOutcome;

    setHighlightData({
      income: {
        amount: totalIncome.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastIncomeTransaction,
      },
      outcome: {
        amount: totalOutcome.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastOutcomeTransaction,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
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
                <Photo source={{ uri: user.photo }} />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.income.amount}
              lastTransaction={highlightData.income.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.outcome.amount}
              lastTransaction={highlightData.outcome.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
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
