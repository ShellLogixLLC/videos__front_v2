import {createAsyncThunk} from '@reduxjs/toolkit';

import {client} from '~/api';

import {videoReducer} from '../constants';

export const sendComment = createAsyncThunk(
  `${videoReducer}/send-comment`,
  async (
    credentials: {videoId?: string | string[]; message: string},
    thunkAPI,
  ) => {
    try {
      await client.post(`/comments`, credentials);
    } catch (error) {
      const {message} = error as Error;

      return thunkAPI.rejectWithValue({error: message});
    }
  },
);
