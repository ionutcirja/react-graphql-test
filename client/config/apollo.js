import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import config from '../../config';

export default (initialState) => (
  new ApolloClient({
    uri: config.apiURL,
    cache: new InMemoryCache().restore(initialState),
  })
);
