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
    pageName: 'Top Rated',
    routeName: Route.Favorites,
  },
  {
    id: 3,
    pageName: 'Most Liked',
    routeName: Route.MostLiked,
  },
  {
    id: 4,
    pageName: 'New',
    routeName: Route.New,
  },
];

export const routesBurger: RoutesProps[] = [
  {
    id: 1,
    pageName: 'Home',
    routeName: Route.Home,
  },

  {
    id: 2,
    pageName: 'Favorites',
    routeName: Route.MyFavorite,
  },
  {
    id: 3,
    pageName: 'Categories',
    routeName: Route.Categories,
  },
  {
    id: 4,
    pageName: 'Top Rated',
    routeName: Route.Favorites,
  },
  {
    id: 5,
    pageName: 'Most Liked',
    routeName: Route.MostLiked,
  },
  {
    id: 6,
    pageName: 'New',
    routeName: Route.New,
  },
];
