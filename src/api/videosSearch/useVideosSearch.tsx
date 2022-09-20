import {useEffect} from 'react';

import {SortingParamsType} from '~/types';
import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {IVideosReturn} from './types';

const useVideosSearch = (
  search: string,
  params: SortingParamsType,
): IVideosReturn => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.VideosSearchService.getVideosSearch(search),
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

export default useVideosSearch;
