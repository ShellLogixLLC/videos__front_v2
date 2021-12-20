export type RoutesProps = {
  routeName: string;
  pageName: string;
  linkCLasses?: string;
  count?: number;
  id?: number;
};

export const routes: RoutesProps[] = [
  {
    id: 1,
    count: 55,
    routeName: '/categories',
    pageName: 'Categories',
    linkCLasses: 'wrapper_content_menu_page',
  },
  {
    pageName: 'Top Rated',
    id: 2,
    count: 123,
    routeName: '/favorites',
    linkCLasses: 'wrapper_content_menu_page',
  },
  {
    pageName: 'Most Liked',
    id: 3,
    count: 90,
    routeName: '/most-liked',
    linkCLasses: 'wrapper_content_menu_page',
  },
  {
    id: 4,
    count: 75,
    pageName: 'New',
    routeName: '/new',
    linkCLasses: 'wrapper_content_menu_page',
  },
];
