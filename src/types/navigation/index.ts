import {ParsedUrlQuery} from 'querystring';

import React from 'react';

import {Route} from '~/constants';

export interface ICommonNavigationItem {
  name: string;
  route: Route;
}

export interface ICommonNavigationWithIcon extends ICommonNavigationItem {
  Icon: React.ComponentType;
}

export interface IRegistrationStepsPageProps {
  step: number;
}

export interface IRegistrationStepsParams {
  step: string;
}

export interface IRegistrationStepsPageParams {
  params: IRegistrationStepsParams;
}

export interface ICategoriesPageQueries extends ParsedUrlQuery {
  name: string;
  page?: string;
}
