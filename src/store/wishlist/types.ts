import {SerializedError} from '@reduxjs/toolkit';

import {LoadingStates} from '~/store/types';

export type WishlistSliceState = {
  loading: LoadingStates;
  error?: SerializedError | any;
  wishlistIds?: string[];
};
