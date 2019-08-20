import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './config/apollo';
import routes from './features/app/routes';
import App from './features/app/components/root';

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App routes={routes} />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
