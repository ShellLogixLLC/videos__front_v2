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
  `${reducerName}/register`,
  async (
    credentials: {email: string; password: string; name: string},
    thunkAPI,
  ) => {
    try {
      const response = await client.post('api/register', credentials);

      return {
        accessToken: response.data.accessToken,
      };
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
