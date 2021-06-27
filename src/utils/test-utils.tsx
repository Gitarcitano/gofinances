import React, { FC, ReactElement } from 'react';

import { render, RenderAPI, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from '../global/styles/theme';

const AllTheProviders: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderAPI =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render };
