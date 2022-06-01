import {useEffect} from 'react';

// import {IWishlistReturn} from '~/api/wishlist/types';
import {useAppRequest} from '~/hooks';
import ApiService from '~/api/ApiService';
import endpoints from '~/api/endpoints';
import {RouterService} from '~/services';

const useVideoWishlist = (limit: number, offset: number): any => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.WishlistService.getWishlistVideos(limit, offset),
  });

  useEffect(() => {
    if (error) {
      RouterService.pushError();
    }
  }, [error]);
};

return {
  isError: !!error,
  data,
  mutate,
};

const WishlistSearchService = {
  useVideoWishlist,
};

export default WishlistSearchService;
