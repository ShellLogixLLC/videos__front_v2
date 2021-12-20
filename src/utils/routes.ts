export type RoutesProps = {
  routeName: string;
  pageName: string;
  count?: number;
  id?: number;
};

export const routes: RoutesProps[] = [
  {
    id: 1,
    count: 55,
    routeName: '/categories',
    pageName: 'Categories',
  },
  {
    pageName: 'Top Rated',
    id: 2,
    count: 123,
    routeName: '/favorites',
  },
  {
    pageName: 'Most Liked',
    id: 3,
    count: 90,
    routeName: '/most-liked',
  },
  {
    id: 4,
    count: 75,
    pageName: 'New',
    routeName: '/new',
  },
];
