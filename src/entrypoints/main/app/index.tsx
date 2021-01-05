import React, { FC } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';
import ThemeProvider from '@fellesdatakatalog/theme';

import store from '../redux/store';

import GlobalStyles from '../styles';

import Router from '../router';

const App: FC = () => (
  <ThemeProvider>
    <GlobalStyles />
    <CookiesProvider>
      <ReduxProvider store={store}>
        <Router />
      </ReduxProvider>
    </CookiesProvider>
  </ThemeProvider>
);

export default App;
