import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {IVideosReturn} from './types';

const useVideos = (): IVideosReturn => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.VideosService.getVideos(),
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

export default useVideos;
