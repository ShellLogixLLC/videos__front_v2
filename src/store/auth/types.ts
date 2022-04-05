import {SerializedError} from '@reduxjs/toolkit';

export enum AuthStates {
  IDLE = 'idle',
  LOADING = 'loading',
  PENDING = 'pending',
}

export type UserInfo = {
  id: string;
  email: string;
  isAdmin: number;
  username: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
  isVerified: number;
};

export type AuthSliceState = {
  error?: SerializedError | any;
  loading: AuthStates;
  userInfo: UserInfo | null;
  isVerified: boolean;
  accessToken: string;
  emailVerify: string;
};

export type UpdateAccessTokenAction = {
  token: string;
};
