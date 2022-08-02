import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {IVideoByCategory} from './types';

const useActiveCategory = (
  limit: number,
  offset: number,
  startDate?: string,
  endDate?: string,
  likesSort?: number | string,
  viewsSort?: number | string,
): IVideoByCategory => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.CategoryService.getVideoByCategoryId(),
    params: {
      limit,
      offset,
      startDate,
      endDate,
      likesSort,
      viewsSort,
    },
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
