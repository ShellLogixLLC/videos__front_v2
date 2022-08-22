import {SerializedError} from '@reduxjs/toolkit';

import {VideosData} from '~/types';
import {LoadingStates} from '~/store/types';

export type WishlistSliceState = {
  error: SerializedError | any;
  loading: LoadingStates;
  wishlistIds: string[];
  wishlistVideos: VideosData | null;
  wishlistVideosLoading: LoadingStates;
};
