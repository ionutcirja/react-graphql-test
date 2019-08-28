import express from 'express';
import cors from 'cors';
import compression from 'compression';
import hogan from 'hogan-express';
import React from 'react';
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from 'styled-components';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { StaticRouter } from 'react-router';
import { renderToStaticMarkup } from 'react-dom/server';
import { getDataFromTree } from '@apollo/react-ssr';
import fetch from 'node-fetch';
import GlobalStyle from '../client/style';
import App from '../client/app/components/root';
import routes from '../client/routes';
import theme from '../client/style/theme';
import config from '../config';

const { PORT } = process.env;

const app = express();
app.set('view engine', 'html');
app.engine('html', hogan);
app.set('views', `${__dirname}/views`);
app.use('/', express.static(`${__dirname}/../public/`));
app.use(cors());
app.use(compression());
app.set('port', (PORT || 9000));
app.use((req, res) => {
  const context = {};
  
  const client = new ApolloClient({
    link: new HttpLink({
      uri: config.apiURL,
      fetch,
    }),
    cache: new InMemoryCache(),
    ssrMode: true,
  });
  const sheet = new ServerStyleSheet();
  const Layout = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <StyleSheetManager sheet={sheet.instance}>
          <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
              <App routes={routes} />
            </ThemeProvider>
          </>
        </StyleSheetManager>
      </StaticRouter>
    </ApolloProvider>
  );
  
  getDataFromTree(Layout).then(() => {
    res.locals.initialState = JSON.stringify(client.extract())
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');
    res.locals.reactMarkup = renderToStaticMarkup(Layout);
    res.locals.styles = sheet.getStyleTags();
    
    if (context.url) {
      res.redirect(301, context.url);
    } else {
      res.status(200).render('index');
    }
  });
});

app.listen(app.get('port'));
