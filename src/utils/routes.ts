import {Route} from '~/constants';

import {RoutesProps} from './type';

export const routes: RoutesProps[] = [
  {
    id: 1,
    pageName: 'categories',
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
