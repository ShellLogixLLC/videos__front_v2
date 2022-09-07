import {createAsyncThunk} from '@reduxjs/toolkit';

import {client} from '~/api';

import {videoReducer} from '../constants';

export const getLikedVideoIds = createAsyncThunk(
  `${videoReducer}/get-liked-ids`,
  async (_, thunkAPI) => {
    try {
      const res = await client.get(`/video-likes/video-ids`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      const {message} = error as Error;
      return thunkAPI.rejectWithValue({error: message});
    }
  },
);

export const getVideoComments = createAsyncThunk(
  `${videoReducer}/get-comments`,
  async (
    {
      videoId,
      limit,
      offset,
    }: {videoId: string; limit?: number; offset?: number},
    thunkAPI,
  ) => {
    try {
      const res = await client.get(`/comments`, {
        params: {
          videoId,
          limit,
          offset,
        },
      });
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      const {message} = error as Error;
      return thunkAPI.rejectWithValue({error: message});
    }
  },
);

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

export const likeVideo = createAsyncThunk(
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
      thunkAPI.dispatch(getLikedVideoIds());
    } catch (error) {
      const {message} = error as Error;

      return thunkAPI.rejectWithValue({error: message});
    }
  },
);

export const dislikeVideo = createAsyncThunk(
  `${videoReducer}/video-dislikes`,
  async (params: {videoId: string}, thunkAPI) => {
    try {
      await client.delete(`/video-likes`, {params});
    } catch (error) {
      const {message} = error as Error;
      return thunkAPI.rejectWithValue({error: message});
    }
  },
);
