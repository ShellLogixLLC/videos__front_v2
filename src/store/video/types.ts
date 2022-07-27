import {SerializedError} from '@reduxjs/toolkit';

import {LoadingStates} from '../types';

export type VideoSliceState = {
  loading: LoadingStates;
  error: SerializedError | any;
};
