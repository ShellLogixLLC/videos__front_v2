import {createAsyncThunk} from '@reduxjs/toolkit';

import {Route} from '~/constants';
import {client} from '~/api';
import {errorToast} from '~/utils';
import {RouterService} from '~/services';

import {reducerName} from './constants';

export const login = createAsyncThunk(
  `${reducerName}/user/login`,
  async (credentials: {email: string; password: string}, thunkAPI) => {
    try {
      const {data} = await client.post('user/login', credentials);

      await RouterService.push(Route.Home);

      return {
        userInfo: data.user,
        accessToken: data.accessToken,
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
  `${reducerName}/user/signup`,
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
      RouterService.push(Route.RegistrationSetupPassword);

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
  `${reducerName}/user/verify`,
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
  `${reducerName}/user/send-verification`,
  async (credentials: {email: string}, thunkAPI) => {
    try {
      const {data} = await client.post('/user/send-verification', credentials);

      return;
    } catch (error) {
      const {message} = error as Error;

      return thunkAPI.rejectWithValue({error: message});
    }
  },
);

export const forgotPassword = createAsyncThunk(
  `${reducerName}/user/send-reset-password`,
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

export const logout = createAsyncThunk(
  `${reducerName}/logout`,
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
