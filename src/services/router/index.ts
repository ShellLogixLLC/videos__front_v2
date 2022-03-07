import Router from 'next/router';

import {Route} from '~/constants';

const RouterService = {
  // pushError: async (): Promise<boolean> => await Router.push(Route.Error),
  pushError: () => {},
  push: async (route: Route): Promise<boolean> => await Router.push(route),
};

export default RouterService;
