import React from 'react';
import { Platform } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Summary } from '../screens/Summary';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(): JSX.Element {
  const theme = useTheme();
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 88,
        },
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons size={size} color={color} name="format-list-bulleted" />
          ),
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons size={size} color={color} name="attach-money" />
          ),
        }}
      />
      <Screen
        name="Resumo"
        component={Summary}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons size={size} color={color} name="pie-chart" />
          ),
        }}
      />
    </Navigator>
  );
}
