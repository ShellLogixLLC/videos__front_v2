import {Route} from '~/constants';

import {RoutesProps} from './types';

export const routes: RoutesProps[] = [
  {
    id: 1,
    pageName: 'Categories',
    routeName: Route.Categories,
  },
  {
    id: 2,
    pageName: 'topRated',
    routeName: Route.Favorites,
  },
  {
    id: 3,
    pageName: 'mostLiked',
    routeName: Route.MostLiked,
  },
  {
    id: 4,
    pageName: 'new',
    routeName: Route.New,
  },
];

export const routesBurger: RoutesProps[] = [
  {
    id: 1,
    pageName: 'home',
    routeName: Route.Home,
  },

  {
    id: 2,
    pageName: 'favorites',
    routeName: Route.MyFavorite,
  },
  {
    id: 3,
    pageName: 'categories',
    routeName: Route.Categories,
  },
  {
    id: 4,
    pageName: 'topRated',
    routeName: Route.Favorites,
  },
  {
    id: 5,
    pageName: 'mostLiked',
    routeName: Route.MostLiked,
  },
  {
    id: 6,
    pageName: 'new',
    routeName: Route.New,
  },
];
