import {SerializedError} from '@reduxjs/toolkit';

export enum AuthStates {
  IDLE = 'idle',
  LOADING = 'loading',
  PENDING = 'pending',
}

export type AuthSliceState = {
  error?: SerializedError | any;
  loading: AuthStates;
  isVerified: boolean;
  accessToken: string;
  emailVerify: string;
};

export type UpdateAccessTokenAction = {
  token: string;
};
