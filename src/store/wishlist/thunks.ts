import {createAsyncThunk} from '@reduxjs/toolkit';

import {client} from '~/api';

import {wishlistReducer} from '../constants';

export const addToWishlist = createAsyncThunk(
  `${wishlistReducer}/add`,
  async (credentials: {videoId: string}, thunkAPI) => {
    try {
      await client.post(`/favorites`, credentials);
      thunkAPI.dispatch(getWishlistIds());
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
      thunkAPI.dispatch(getWishlistIds());
    } catch (error) {
      const {message} = error as Error;

      return thunkAPI.rejectWithValue({error: message});
    }
  },
);

export const getWishlistIds = createAsyncThunk(
  `${wishlistReducer}/id`,
  async (_, thunkAPI) => {
    try {
      const res = await client.get(`/favorites`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      const {message} = error as Error;
      return thunkAPI.rejectWithValue({error: message});
    }
  },
);
