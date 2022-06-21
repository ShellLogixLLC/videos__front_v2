import {createSlice} from '@reduxjs/toolkit';

import {RootState} from '~/types';

import {wishlistReducer} from '../constants';
import {LoadingStates} from '../types';

import * as wishlistThunks from './thunks';
import {WishlistSliceState} from './types';

const internalInitialState: WishlistSliceState = {
  loading: LoadingStates.IDLE,
  error: null,
};

const wishlistSlice = createSlice({
  name: wishlistReducer,
  initialState: internalInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(wishlistThunks.addToWishlist.pending, (state) => {
      state.loading = LoadingStates.LOADING;
    });
    builder.addCase(wishlistThunks.addToWishlist.fulfilled, (state) => {
      state.error = null;
      state.loading = LoadingStates.IDLE;
    });
    builder.addCase(wishlistThunks.addToWishlist.rejected, (state, action) => {
      state.loading = LoadingStates.LOADING;
      state.error = action.error;
    });
    builder.addCase(wishlistThunks.deleteFromWishlist.pending, (state) => {
      state.loading = LoadingStates.LOADING;
    });
    builder.addCase(wishlistThunks.deleteFromWishlist.fulfilled, (state) => {
      state.error = null;
      state.loading = LoadingStates.IDLE;
    });
    builder.addCase(
      wishlistThunks.deleteFromWishlist.rejected,
      (state, action) => {
        state.loading = LoadingStates.IDLE;
        state.error = action.error;
      },
    );
  },
});

const {reducer, actions} = wishlistSlice;

export const wishlistSelect = (state: RootState): WishlistSliceState =>
  state.wishlist;

export const wishlistActions = {
  ...actions,
  ...wishlistThunks,
};

export default reducer;
