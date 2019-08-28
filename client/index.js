/* eslint-disable no-underscore-dangle */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import createClient from 'config/apollo';
import GlobalStyle from 'style';
import theme from 'style/theme';
import routes from 'routes';
import App from 'app/components/root';

const initialState = JSON.parse(window.__INITIAL_STATE__ || '{}');

render(
  <ApolloProvider client={createClient(initialState)}>
    <GlobalStyle />
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App routes={routes} />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
