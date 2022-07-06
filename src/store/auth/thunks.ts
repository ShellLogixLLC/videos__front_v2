import {createAsyncThunk} from '@reduxjs/toolkit';

import {Route} from '~/constants';
import {client} from '~/api';
import {setCookie} from '~/libraries';
import {errorToast} from '~/utils';
import {RouterService} from '~/services';

import {authReducer} from '../constants';

export const login = createAsyncThunk(
  `${authReducer}/user/login`,
  async (credentials: {email: string; password: string}, thunkAPI) => {
    try {
      const {data} = await client.post('/user/login', credentials);

      await RouterService.push(Route.Home);
      setCookie('token', data.token);

      return {
        userInfo: data.user,
        accessToken: data.token,
      };
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      const {errors} = error.response.data;
      if (errors) errorToast(errors);

      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  },
);

export const loginWithToken = createAsyncThunk(
  `${authReducer}/user/login-with-token`,
  async (credentials: {token: string}, thunkAPI) => {
    try {
      const {data} = await client.post('/user/login-with-token', credentials);

      return {
        userInfo: data.user,
        accessToken: data.token,
      };
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      const {errors} = error.response.data;
      if (errors) errorToast(errors);

      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  },
);
export const register = createAsyncThunk(
  `${authReducer}/user/signup`,
  async (
    credentials: {
      email: string;
      username: string;
      password: string;
      passwordConfirmation: string;
    },
    thunkAPI,
  ) => {
    try {
      const {data} = await client.post('/user/signup', credentials);
      await RouterService.push(Route.RegistrationSetupPassword);

      return {
        emailVerify: data.email,
      };
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      const {errors} = error.response.data;
      if (errors) errorToast(errors);

      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  },
);

export const userVerify = createAsyncThunk(
  `${authReducer}/user/verify`,
  async (credentials: {email: string; code: string}, thunkAPI) => {
    try {
      const {data} = await client.post('/user/verify', credentials);

      return {
        isVerified: data.success,
      };
    } catch (error) {
      const {message} = error as Error;
      return thunkAPI.rejectWithValue({error: message});
    }
  },
);

export const userSentVerifyAgain = createAsyncThunk(
  `${authReducer}/user/send-verification`,
  async (credentials: {email: string}, thunkAPI) => {
    try {
      await client.post('/user/send-verification', credentials);
    } catch (error) {
      const {message} = error as Error;

      return thunkAPI.rejectWithValue({error: message});
    }
  },
);

export const forgotPassword = createAsyncThunk(
  `${authReducer}/user/send-reset-password`,
  async (credentials: {email: string}, thunkAPI) => {
    try {
      const {data} = await client.post('user/send-reset-password', credentials);

      return {
        isVerified: data.success,
      };
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      const {errors} = error.response.data;
      if (errors) errorToast(errors);

      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  },
);

export const resetPassword = createAsyncThunk(
  `${authReducer}/user/reset-password`,
  async (
    credentials: {
      token: string;
      password: string;
      resetTokenId: string;
      passwordConfirmation: string;
    },
    thunkAPI,
  ) => {
    try {
      const {data} = await client.post('user/reset-password', credentials);

      await RouterService.push(Route.Home);

      return {
        isVerified: data.success,
      };
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      const {errors} = error.response.data;
      if (errors) errorToast(errors);

      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  },
);

export const changePassword = createAsyncThunk(
  `${authReducer}/user/change-password`,
  async (
    credentials: {
      currentPassword: string;
      newPassword: string;
      passwordConfirmation: string;
    },
    thunkAPI,
  ) => {
    try {
      const {data} = await client.post('user/change-password', credentials);

      await RouterService.push(Route.Home);

      return {
        isVerified: data.success,
      };
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      const {errors} = error.response.data;
      if (errors) errorToast(errors);

      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  },
);

export const logout = createAsyncThunk(
  `${authReducer}/logout`,
  async (_, thunkAPI) => {
    try {
      const response = await client.delete('api/logout');

      return response.data;
    } catch (error) {
      const {message} = error as Error;

      return thunkAPI.rejectWithValue({error: message});
    }
  },
);
