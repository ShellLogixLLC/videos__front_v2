import {createSlice} from '@reduxjs/toolkit';

import {RootState} from '~/types';

import {LoadingStates} from '../types';
import {videoReducer} from '../constants';

import * as videoThunks from './thunks';
import {VideoSliceState} from './types';

const internalInitialState: VideoSliceState = {
  error: null,
  likedVideoIds: [],
  commentsLoading: LoadingStates.IDLE,
  videoLikesLoading: LoadingStates.IDLE,
  getCommentsLoading: LoadingStates.IDLE,
};

const videoSlice = createSlice({
  name: videoReducer,
  initialState: internalInitialState,
  reducers: {
    deleteVideoLikes(state: VideoSliceState) {
      state.likedVideoIds = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(videoThunks.getVideoComments.pending, (state) => {
      state.getCommentsLoading = LoadingStates.LOADING;
    });
    builder.addCase(videoThunks.getVideoComments.rejected, (state, action) => {
      state.getCommentsLoading = LoadingStates.REJECTED;
      state.error = action.error;
    });
    builder.addCase(videoThunks.getVideoComments.fulfilled, (state) => {
      state.getCommentsLoading = LoadingStates.IDLE;
    });
    builder.addCase(videoThunks.getLikedVideoIds.pending, (state) => {
      state.getCommentsLoading = LoadingStates.LOADING;
    });
    builder.addCase(videoThunks.getLikedVideoIds.rejected, (state, action) => {
      state.getCommentsLoading = LoadingStates.REJECTED;
      state.error = action.error;
    });
    builder.addCase(videoThunks.getLikedVideoIds.fulfilled, (state, action) => {
      state.getCommentsLoading = LoadingStates.IDLE;
      state.likedVideoIds = action.payload;
    });
    builder.addCase(videoThunks.sendComment.pending, (state) => {
      state.commentsLoading = LoadingStates.LOADING;
    });
    builder.addCase(videoThunks.sendComment.rejected, (state, action) => {
      state.commentsLoading = LoadingStates.REJECTED;
      state.error = action.error;
    });
    builder.addCase(videoThunks.sendComment.fulfilled, (state) => {
      state.commentsLoading = LoadingStates.IDLE;
    });

    builder.addCase(videoThunks.likeVideo.pending, (state) => {
      state.videoLikesLoading = LoadingStates.LOADING;
    });
    builder.addCase(videoThunks.likeVideo.rejected, (state, action) => {
      state.videoLikesLoading = LoadingStates.REJECTED;
      state.error = action.error;
    });
    builder.addCase(videoThunks.likeVideo.fulfilled, (state) => {
      state.videoLikesLoading = LoadingStates.IDLE;
    });
    builder.addCase(videoThunks.dislikeVideo.pending, (state) => {
      state.videoLikesLoading = LoadingStates.LOADING;
    });
    builder.addCase(videoThunks.dislikeVideo.rejected, (state, action) => {
      state.videoLikesLoading = LoadingStates.REJECTED;
      state.error = action.error;
    });
    builder.addCase(videoThunks.dislikeVideo.fulfilled, (state) => {
      state.videoLikesLoading = LoadingStates.IDLE;
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
