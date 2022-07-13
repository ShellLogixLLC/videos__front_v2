import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {IVideoByCategory} from './types';

const useVideosByCategoryId = (
  limit: number,
  offset: number,
  activeVCategoryId?: string | string[],
  startDate?: string,
  endDate?: string,
  likesSort?: number | string,
  viewsSort?: number | string,
  durationSort?: number | string,
): IVideoByCategory => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.CategoryService.getVideoByCategoryId(),
    params: {
      limit,
      offset,
      categoryIds: [activeVCategoryId],
      startDate,
      endDate,
      likesSort,
      viewsSort,
      durationSort,
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

export default useVideosByCategoryId;
