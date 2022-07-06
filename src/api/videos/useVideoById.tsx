import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {IVideoById} from './types';

const useVideoById = (): IVideoById => {
  const router = useRouter();
  const {id: activeVideoId} = router.query;

  const {data, mutate, error} = useAppRequest({
    url: endpoints.VideosService.getVideoById(activeVideoId),
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

export default useVideoById;
