import Router from 'next/router';

import {QueryParamsTypes} from '~/types';

const setQueryParams = (newQueries: QueryParamsTypes): void => {
  Router.push(
    {
      pathname: Router.pathname,
      query: newQueries,
    },
    undefined,
    {
      shallow: true,
    },
  );
};

export default setQueryParams;
