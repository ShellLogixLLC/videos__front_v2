import {ActiveCategoryRoute, Route} from '~/constants';

import {RoutesProps} from './types';

export const routes: RoutesProps[] = [
  {
    id: 1,
    pageName: 'categories',
    routeName: Route.Categories,
  },
  {
    id: 2,
    pageName: 'mostViewed',
    routeName: Route.TopRated,
    queryValue: ActiveCategoryRoute.Most_Viewed,
  },
  {
    id: 3,
    pageName: 'mostLiked',
    routeName: Route.MostLiked,
    queryValue: ActiveCategoryRoute.Most_Liked,
  },
  {
    id: 4,
    pageName: 'new',
    routeName: Route.New,
    queryValue: ActiveCategoryRoute.New,
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
    routeName: Route.Favorites,
  },
  {
    id: 3,
    pageName: 'categories',
    routeName: Route.Categories,
  },
  {
    id: 4,
    pageName: 'mostViewed',
    routeName: Route.TopRated,
    queryValue: ActiveCategoryRoute.Most_Viewed,
  },
  {
    id: 5,
    pageName: 'mostLiked',
    routeName: Route.MostLiked,
    queryValue: ActiveCategoryRoute.Most_Liked,
  },
  {
    id: 6,
    pageName: 'new',
    routeName: Route.New,
    queryValue: ActiveCategoryRoute.New,
  },
];
