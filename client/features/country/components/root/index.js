// @flow
import React from 'react';
import { withTheme } from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Maybe } from 'monet';
import queryString from 'query-string';
import type { Country, Theme } from 'types';
import {
  BackLink,
  Message,
  ListTitle,
  Details,
  SubList,
  ListItem,
} from 'style/common';

type Props = {
  match: {
    params: {
      code?: string,
    },
  },
  location: {
    search: string,
  },
  theme: Theme,
}

type CountryData = {|
  country: Country,
|}

type ErrorData = {|
  message: string,
|}

type Response = CountryData | ErrorData

type QueryVars = {
  code?: string,
}

export const GET_COUNTRY_QUERY = gql`
  query getCountry($code: String) {
    country(code: $code) {
      name,
      native,
      phone,
      continent {
        name
      },
      currency,
      languages {
        name,
        native
      }
    }
  }
`;

const renderLoading = (theme: Theme) => (
  <Message color={theme.colors.darkBlue}>
    Loading country data...
  </Message>
);

const renderError = (theme: Theme, message?: String) => (
  Maybe.fromNull(message)
    .map((value) => (
      <Message color={theme.colors.red}>
        {value}
      </Message>
    ))
    .orSome('')
);

const renderData = (theme: Theme, {
  name,
  native,
  continent,
  phone,
  currency,
  languages,
}: Country) => (
  <>
    <ListTitle color={theme.colors.turquoise}>
      {name}
    </ListTitle>
    {Maybe.fromNull(native)
      .map((value) => (
        <Details color={theme.colors.darkBlue}>
          {`Native name: ${value}`}
        </Details>
      ))
      .orSome('')}
    {Maybe.fromNull(continent)
      .map((value) => (
        <Details color={theme.colors.darkBlue}>
          {`Continent: ${value.name}`}
        </Details>
      ))
      .orSome('')}
    {Maybe.fromNull(phone)
      .map((value) => (
        <Details color={theme.colors.darkBlue}>
          {`Phone prefix: ${value}`}
        </Details>
      ))
      .orSome('')}
    {Maybe.fromNull(currency)
      .map((value) => (
        value
        && (
          <Details color={theme.colors.darkBlue}>
            {`Currency: ${value}`}
          </Details>
        )))
      .orSome('')}
    {Maybe.fromNull(languages)
      .map((value) => (
        value.length > 0
        && (
          <>
            <Details color={theme.colors.darkBlue}>
              Languages:
            </Details>
            <SubList>
              {value.map(({ name, native }) => ( // eslint-disable-line no-shadow
                <ListItem key={name} color={theme.colors.darkBlue}>
                  {`${name} (Native name: ${native})`}
                </ListItem>
              ))}
            </SubList>
          </>
        )))
      .orSome('')}
  </>
);

const CountryInfo = ({ theme, match, location }: Props) => {
  const queries = queryString.parse(location.search);
  const backLink = Maybe.fromNull(queries.continent)
    .fold('/countries')(
      (value) => `/continents/${value}`,
    );
  
  const { loading, error, data } = useQuery<Response, QueryVars>(
    GET_COUNTRY_QUERY,
    { variables: { code: match.params.code } },
  );
  
  return (
    <div>
      <BackLink
        color={theme.colors.blue}
        to={backLink}
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
        .map((value) => renderData(theme, { ...value.country }))
        .orSome('')}
    </div>
  );
};

export default withTheme(CountryInfo);
