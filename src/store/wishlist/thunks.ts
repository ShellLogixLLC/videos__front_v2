import {createAsyncThunk} from '@reduxjs/toolkit';

import {client} from '~/api';

import {wishlistReducer} from '../constants';

export const sendComment = createAsyncThunk(
  `${wishlistReducer}/send-comment`,
  async (credentials: {videoId: string; message: string}, thunkAPI) => {
    try {
      await client.post(`/comments`, credentials);
    } catch (error) {
      const {message} = error as Error;

      return thunkAPI.rejectWithValue({error: message});
    }
  },
);
