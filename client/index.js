import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import client from 'config/apollo';
import GlobalStyle from 'style';
import theme from 'style/theme';
import routes from 'routes';
import App from 'features/app/components/root';

render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App routes={routes} />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
