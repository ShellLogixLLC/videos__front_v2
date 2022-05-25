import Router from 'next/router';

import {queryParamsTypes} from '~/types';

const setQueryParams = (newQueries: queryParamsTypes): void => {
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
