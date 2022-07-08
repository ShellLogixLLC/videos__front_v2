import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {IVideoSimilar} from './types';

const useVideoSimilar = (limit: number, offset: number): IVideoSimilar => {
  const router = useRouter();
  const {id: activeVideoId} = router.query;

  const {data, mutate, error} = useAppRequest({
    url: endpoints.VideosService.getVideoSimilar(offset, limit, activeVideoId),
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

export default useVideoSimilar;
