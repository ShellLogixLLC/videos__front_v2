import {createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

import {client} from '~/api';
import {Route} from '~/constants';
import {RouterService} from '~/services';

import {reducerName} from './constants';

export const login = createAsyncThunk(
  `${reducerName}/login`,
  async (credentials: {email: string; password: string}, thunkAPI) => {
    try {
      const response = await client.post('api/login', credentials);

      await RouterService.push(Route.Home);

      return {
        accessToken: response.data.accessToken,
      };
    } catch (error) {
      const {message} = error as Error;

      toast.error(message);

      return thunkAPI.rejectWithValue({error: message});
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

      return {
        emailVerify: data.email,
      };
    } catch (error) {
      const {message} = error as Error;

      return thunkAPI.rejectWithValue({error: message});
    }
  },
);

export const userVerify = createAsyncThunk(
  `${reducerName}/user/verify`,
  async (credentials: {email: string; code: string}, thunkAPI) => {
    try {
      const {data} = await client.post('/user/verify', credentials);
      console.log(data, 'userVerify');

      return {
        isVerify: data.success,
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
      console.log(data, 'userTwoVerify');

      return;
    } catch (error) {
      const {message} = error as Error;

      return thunkAPI.rejectWithValue({error: message});
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
