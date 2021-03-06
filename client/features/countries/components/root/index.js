// @flow
import React from 'react';
import { withTheme } from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Maybe } from 'monet';
import type { Theme, Country } from 'types';
import {
  DASHBOARD_ROUTE,
  CONTINENTS_ROUTE,
  COUNTRIES_ROUTE,
  CONTINENT_QUERY_PARAM,
} from 'routes';
import {
  BackLink,
  Message,
  List,
  ListItem,
  ListLink,
  ListTitle,
} from 'style/common';

type Props = {
  match: {
    params: {
      code?: string,
    },
  },
  theme: Theme,
}

type CountriesData = {|
  countries: Array<Country>,
|}

type ContinentData = {|
  continent: CountriesData & {
    code: string,
    name: string,
  },
|}

type ErrorData = {|
  message: string,
|}

type Response = ContinentData | CountriesData | ErrorData

type QueryVars = {
  code?: string,
}

export const GET_ALL_COUNTRIES_QUERY = gql`
  {
    countries {
      name,
      code,
      native,
      continent {
        name
      }
    }
  }
`;

export const GET_CONTINENT_COUNTRIES_QUERY = gql`
  query getContinent($code: String) {
    continent(code: $code) {
      name,
      code,
      countries {
        name,
        code,
        native
      }
    }
  }
`;

const renderLoading = (theme: Theme) => (
  <Message color={theme.colors.darkBlue}>
    Loading countries list...
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

type RenderData = {
  cname?: string,
  ccode?: string,
  list?: Array<Country>,
}

const renderData = (theme: Theme, { list, cname, ccode }: RenderData) => (
  <>
    {Maybe.fromNull(cname)
      .map((value) => (
        <ListTitle color={theme.colors.turquoise}>
          {value}
        </ListTitle>
      ))
      .orSome('')}
    {Maybe.fromNull(list)
      .map((value) => (
        <List>
          {value.map(({
            name,
            code,
            native,
            continent,
          }) => (
            <ListItem key={code}>
              <ListLink
                color={theme.colors.darkBlue}
                to={`${COUNTRIES_ROUTE}/${code}${
                  Maybe.fromNull(ccode)
                    .fold('')(
                      (cvalue) => `?${CONTINENT_QUERY_PARAM}=${cvalue}`,
                    )
                }`}
              >
                {Maybe.fromNull(continent)
                  .fold(`${name} (${native})`)(
                    (cvalue) => `${name} (${native}) - ${cvalue.name}`,
                  )}
              </ListLink>
            </ListItem>
          ))}
        </List>
      ))
      .orSome('')}
  </>
);

const computeBackLinkAddress = (code?: string) => (
  Maybe.fromNull(code)
    .fold(DASHBOARD_ROUTE)(
      () => CONTINENTS_ROUTE,
    )
);

const computeQuery = (countryCode?: string) => (
  Maybe.fromNull(countryCode)
    .fold([GET_ALL_COUNTRIES_QUERY])(
      (code) => [
        GET_CONTINENT_COUNTRIES_QUERY,
        { variables: { code } },
      ],
    )
);

const Countries = ({ theme, match }: Props) => {
  const {
    loading,
    error,
    data,
  } = useQuery<Response, QueryVars>(...computeQuery(match.params.code));
  
  return (
    <div>
      <BackLink
        color={theme.colors.blue}
        to={computeBackLinkAddress(match.params.code)}
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
        .map((value) => renderData(theme, Maybe.fromNull(value.continent)
          .fold({
            list: value.countries,
          })(
            (continent) => ({
              ccode: continent.code,
              cname: continent.name,
              list: continent.countries,
            }),
          )))
        .orSome('')}
    </div>
  );
};

export default withTheme(Countries);
