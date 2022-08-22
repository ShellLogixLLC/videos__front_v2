import {SerializedError} from '@reduxjs/toolkit';

import {LoadingStates} from '../types';

export type VideoSliceState = {
  commentsLoading: LoadingStates;
  videoLikesLoading: LoadingStates;
  error: SerializedError | any;
};
