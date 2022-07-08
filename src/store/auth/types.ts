import {SerializedError} from '@reduxjs/toolkit';

import {LoadingStates} from '../types';

export type UserInfo = {
  id: string;
  email: string;
  isAdmin: boolean;
  username: string | string[];
  imagePath: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
};

export type AuthSliceState = {
  error?: SerializedError | any;
  loading: LoadingStates;
  userInfo?: UserInfo | null;
  isVerified: boolean;
  accessToken: string;
  emailVerify: string;
};

export type UpdateAccessTokenAction = {
  token: string;
};
