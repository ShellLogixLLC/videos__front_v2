import {SerializedError} from '@reduxjs/toolkit';

import {LoadingStates} from '../types';

export type VideoSliceState = {
  error: SerializedError | any;
  commentsLoading: LoadingStates;
  videoLikesLoading: LoadingStates;
  getCommentsLoading: LoadingStates;
};
