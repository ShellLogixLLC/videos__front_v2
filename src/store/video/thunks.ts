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

export const likedVideo = createAsyncThunk(
  `${videoReducer}/video-likes`,
  async (
    credentials: {
      videoId: string;
      dislike: boolean;
    },
    thunkAPI,
  ) => {
    try {
      await client.post(`/video-likes`, credentials);
    } catch (error) {
      const {message} = error as Error;

      return thunkAPI.rejectWithValue({error: message});
    }
  },
);
