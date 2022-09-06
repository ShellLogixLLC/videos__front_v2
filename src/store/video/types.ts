import {SerializedError} from '@reduxjs/toolkit';

import {LoadingStates} from '../types';

export type VideoSliceState = {
  error: SerializedError | any;
  likedVideoIds: string[];
  commentsLoading: LoadingStates;
  videoLikesLoading: LoadingStates;
  getCommentsLoading: LoadingStates;
};
