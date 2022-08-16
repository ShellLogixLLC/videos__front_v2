import {SerializedError} from '@reduxjs/toolkit';

import {LoadingStates} from '~/store/types';
import {VideosData, VideosProps} from '~/types';

export type WishlistSliceState = {
  loading: LoadingStates;
  error: SerializedError | any;
  wishlistIds: string[];
  wishlistVideos: VideosData | null;
  localVideos: VideosProps[];
  wishlistVideosLoading: LoadingStates;
};
