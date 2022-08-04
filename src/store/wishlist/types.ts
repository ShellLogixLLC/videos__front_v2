import {SerializedError} from '@reduxjs/toolkit';

import {LoadingStates} from '~/store/types';
// import {CategoriesProps, VideosProps} from '~/types';

export type WishlistSliceState = {
  loading: LoadingStates;
  error?: SerializedError | any;
  wishlistIds?: string[];
  wishlistVideos?: any;
  // videos: VideosProps[] | CategoriesProps[];
  // totalCount: number;
};
