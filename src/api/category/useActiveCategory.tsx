import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';
import {ActiveCategoryParams} from '~/types';

import endpoints from '../endpoints';

import {IVideoByCategory} from './types';

const useActiveCategory = (params: ActiveCategoryParams): IVideoByCategory => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.CategoryService.getVideoByCategoryId(),
    params,
  });

  useEffect(() => {
    if (error) {
      RouterService.pushError();
    }
  }, [error]);

  return {
    isError: !!error,
    data,
    mutate,
    isLoading: !error && !data,
  };
};

export default useActiveCategory;
