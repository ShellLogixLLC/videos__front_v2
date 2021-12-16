export type RoutesProps = {
  routeName: string;
  pageName?: string;
  linkCLasses?: string;
};

export const routes: RoutesProps[] = [
  {
    routeName: '/categories',
    pageName: 'Categories',
    linkCLasses: 'wrapper_content_menu_page',
  },
  {
    pageName: 'Top Rated',
    routeName: '/favorites',
    linkCLasses: 'wrapper_content_menu_page',
  },
  {
    pageName: 'Most Liked',
    routeName: '/most-liked',
    linkCLasses: 'wrapper_content_menu_page',
  },
  {
    pageName: 'New',
    routeName: '/new',
    linkCLasses: 'wrapper_content_menu_page',
  },
];
