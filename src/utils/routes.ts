import {Route} from '~/constants';

import {RoutesProps} from './type';

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
