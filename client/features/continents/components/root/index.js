// @flow
import React from 'react';
import { withTheme } from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Maybe } from 'monet';
import type { Continent, Theme } from 'types';
import {
  BackLink,
  Message,
  List,
  ListItem,
  ListLink,
} from 'style/common';

type ContinentsData = {|
  continents: Array<Continent>,
|}

type ErrorData = {|
  message: string,
|}

type Response = ContinentsData | ErrorData

type Props = {
  theme: Theme,
}

export const GET_CONTINENTS_QUERY = gql`
  {
    continents {
      name,
      code
    }
  }
`;

const renderLoading = (theme: Theme) => (
  <Message color={theme.colors.darkBlue}>
    Loading continents list...
  </Message>
);

const renderError = (theme: Theme, message?: String) => (
  Maybe.fromNull(message)
    .map((value) => (
      <Message color={theme.colors.darkBlue}>
        {value}
      </Message>
    ))
    .orSome('')
);

const renderData = (theme: Theme, list?: Array<Continent>) => (
  Maybe.fromNull(list)
    .map((value) => (
      <List>
        {value.map(({ name, code }) => (
          <ListItem key={code}>
            <ListLink
              color={theme.colors.darkBlue}
              to={`/continents/${code}`}
            >
              {name}
            </ListLink>
          </ListItem>
        ))}
      </List>
    ))
    .orSome('')
);

const Continents = ({ theme }: Props) => {
  const { loading, error, data } = useQuery<Response>(GET_CONTINENTS_QUERY);
  
  return (
    <div>
      <BackLink
        color={theme.colors.blue}
        to="/dashboard"
      >
        Back
      </BackLink>
      {Maybe.fromFalsy(loading)
        .map(() => renderLoading(theme))
        .orSome('')}
      {Maybe.fromNull(error)
        .map((value) => renderError(theme, value.message))
        .orSome('')}
      {Maybe.fromNull(data)
        .map((value) => renderData(theme, value.continents))
        .orSome('')}
    </div>
  );
};

export default withTheme(Continents);
