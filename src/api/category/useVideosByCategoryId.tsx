import {useEffect} from 'react';

import {SortingParamsType} from '~/types';
import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {IVideoByCategory} from './types';

const useVideosByCategoryId = (params: SortingParamsType): IVideoByCategory => {
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

export default useVideosByCategoryId;
