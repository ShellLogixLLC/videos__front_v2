import {Route} from '~/constants';

import {RoutesProps} from './types';

export const routes: RoutesProps[] = [
  {
    id: 1,
    pageName: 'common.categories',
    routeName: Route.Categories,
  },
  {
    id: 2,
    pageName: 'common.topRated',
    routeName: Route.Favorites,
  },
  {
    id: 3,
    pageName: 'common.mostLiked',
    routeName: Route.MostLiked,
  },
  {
    id: 4,
    pageName: 'common.new',
    routeName: Route.New,
  },
];

export const routesBurger: RoutesProps[] = [
  {
    id: 1,
    pageName: 'common.home',
    routeName: Route.Home,
  },

  {
    id: 2,
    pageName: 'common.favorites',
    routeName: Route.MyFavorite,
  },
  {
    id: 3,
    pageName: 'common.categories',
    routeName: Route.Categories,
  },
  {
    id: 4,
    pageName: 'common.topRated',
    routeName: Route.Favorites,
  },
  {
    id: 5,
    pageName: 'common.mostLiked',
    routeName: Route.MostLiked,
  },
  {
    id: 6,
    pageName: 'common.new',
    routeName: Route.New,
  },
];
