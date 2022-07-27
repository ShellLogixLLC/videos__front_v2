import {createSlice} from '@reduxjs/toolkit';

import {RootState} from '~/types';

import {videoReducer} from '../constants';
import {LoadingStates} from '../types';

import * as videoThunks from './thunks';
import {VideoSliceState} from './types';

const internalInitialState: VideoSliceState = {
  error: null,
  loading: LoadingStates.IDLE,
};

const videoSlice = createSlice({
  name: videoReducer,
  initialState: internalInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(videoThunks.sendComment.pending, (state) => {
      state.loading = LoadingStates.LOADING;
    });
    builder.addCase(videoThunks.sendComment.rejected, (state, action) => {
      state.loading = LoadingStates.REJECTED;
      state.error = action.error;
    });
    builder.addCase(videoThunks.sendComment.fulfilled, (state) => {
      state.loading = LoadingStates.IDLE;
    });
  },
});

const {reducer, actions} = videoSlice;

export const videoSelect = (state: RootState): VideoSliceState => state.video;

export const videoActions = {
  ...actions,
  ...videoThunks,
};

export default reducer;
