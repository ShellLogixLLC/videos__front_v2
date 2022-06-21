import {useEffect} from 'react';

import {IWishlist} from '~/api/wishlist/types';
import {useAppRequest} from '~/hooks';
import endpoints from '~/api/endpoints';
import {RouterService} from '~/services';

const useVideoWishlist = (limit: number, offset: number): IWishlist => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.WishlistService.getWishlistVideos(),
    params: {
      limit,
      offset,
    },
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

export default useVideoWishlist;
