import {SerializedError} from '@reduxjs/toolkit';

import {LoadingStates} from '~/store/types';
import {CategoriesProps, VideosProps} from '~/types';

export type WishlistSliceState = {
  loading: LoadingStates;
  error?: SerializedError | any;
  wishlistIds?: string[];
  wishlistVideos?: {
    videos: VideosProps[] | CategoriesProps[];
    totalCount: number;
  };
};
