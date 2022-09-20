import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';
import {RandomSortingParamsType} from '~/types';

import endpoints from '../endpoints';

import {IVideosReturn} from './types';

const useRandomVideos = (params: RandomSortingParamsType): IVideosReturn => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.VideosService.getRandomVideos(),
    params,
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

export default useRandomVideos;
