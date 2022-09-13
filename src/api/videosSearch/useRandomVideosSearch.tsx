import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';
import {RandomSortingParamsType} from '~/types';

import endpoints from '../endpoints';

import {IVideosReturn} from './types';

const useRandomVideosSearch = (
  search: string,
  params: RandomSortingParamsType,
): IVideosReturn => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.VideosSearchService.getRandomVideosSearch(search),
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

export default useRandomVideosSearch;
