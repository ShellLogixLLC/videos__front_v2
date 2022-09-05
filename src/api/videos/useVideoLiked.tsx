import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

// import {IVideoLiked} from './types';

const useVideoLiked = () => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.VideosService.getVideoLikesIds(),
  });

  useEffect(() => {
    if (error) {
      RouterService.pushError();
    }
  }, [error]);

  return {
    isError: !!error,
    data: data,
    mutate: mutate,
    isLoading: !error && !data,
  };
};

export default useVideoLiked;
