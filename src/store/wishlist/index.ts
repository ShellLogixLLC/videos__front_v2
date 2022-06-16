import {createSlice} from '@reduxjs/toolkit';

import {RootState} from '~/types';

import {wishlistReducer} from '../constants';
import {LoadingStates} from '../types';

import * as wishlistThunks from './thunks';
import {WishlistSliceState} from './types';

const internalInitialState: WishlistSliceState = {
  loading: LoadingStates.IDLE,
};

const wishlistSlice = createSlice({
  name: wishlistReducer,
  initialState: internalInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(wishlistThunks.sendComment.fulfilled, (state) => {
      state.loading = LoadingStates.IDLE;
    });
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
