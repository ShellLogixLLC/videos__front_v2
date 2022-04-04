import {SerializedError} from '@reduxjs/toolkit';

import {AuthStates} from './constants';

export type AuthSliceState = {
  user: any;
  error?: SerializedError | any;
  loading: AuthStates;
  isVerify: boolean;
  accessToken: string;
  emailVerify: string;
};

export type UpdateAccessTokenAction = {
  token: string;
};
