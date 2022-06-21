import {createAsyncThunk} from '@reduxjs/toolkit';

import {client} from '~/api';

import {wishlistReducer} from '../constants';

export const addToWishlist = createAsyncThunk(
  `${wishlistReducer}/add`,
  async (credentials: {videoId: string}, thunkAPI) => {
    try {
      await client.post(`/favorites`, credentials);
    } catch (error) {
      const {message} = error as Error;

      return thunkAPI.rejectWithValue({error: message});
    }
  },
);

export const deleteFromWishlist = createAsyncThunk(
  `${wishlistReducer}/delete`,
  async (params: {videoId: string}, thunkAPI) => {
    try {
      await client.delete(`/favorites`, {params});
    } catch (error) {
      const {message} = error as Error;

      return thunkAPI.rejectWithValue({error: message});
    }
  },
);
