import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {IWishlistIds} from './types';

const useVideoWishlistIds = (): IWishlistIds => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.WishlistService.getWishlistVideoIds(),
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

export default useVideoWishlistIds;
