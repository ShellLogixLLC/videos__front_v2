import {useEffect} from 'react';

import {Params} from '~/types';
import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {IVideosReturn} from './types';

const useVideosSearch = (search: any, params: Params): IVideosReturn => {
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

const VideosSearchService = {
  useVideosSearch,
};

export default VideosSearchService;
