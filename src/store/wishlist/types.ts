import {SerializedError} from '@reduxjs/toolkit';

import {LoadingStates} from '~/store/types';
import {VideosData} from '~/types';

export type WishlistSliceState = {
  loading: LoadingStates;
  error: SerializedError | any;
  wishlistIds: string[];
  wishlistVideos: VideosData | null;
  wishlistVideosLoading: LoadingStates;
};
