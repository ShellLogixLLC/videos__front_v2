import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {IVideosReturn} from './types';

const useVideosSearch = (
  arg: any,
  limit: number,
  offset: number,
): IVideosReturn => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.VideosSearchService.getVideosSearch(arg, limit, offset),
  });

  useEffect(() => {
    if (error) {
      RouterService.pushError();
    }
  }, [error]);

  return {
    isError: !!error,
    videosData: data,
    mutateVideo: mutate,
    isLoading: !error && !data,
  };
};

const VideosSearchService = {
  useVideosSearch,
};

export default VideosSearchService;
