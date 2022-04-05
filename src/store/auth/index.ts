import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '~/types';

import * as authThunks from './thunks';
import {reducerName} from './constants';
import {AuthSliceState, AuthStates, UpdateAccessTokenAction} from './types';

const internalInitialState: AuthSliceState = {
  error: null,
  loading: AuthStates.IDLE,
  userInfo: null,
  accessToken: '',
  emailVerify: '',
  isVerified: false,
};

const authSlice = createSlice({
  name: reducerName,
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(state, action: PayloadAction<UpdateAccessTokenAction>) {
      state.accessToken = action.payload.token;
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(authThunks.login.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(authThunks.login.fulfilled, (state, action) => {
      state.error = null;
      state.userInfo = action.payload.userInfo;
      state.accessToken = action.payload.accessToken;
      state.loading = AuthStates.IDLE;
    });
    builder.addCase(authThunks.login.rejected, (state, action) => {
      state.loading = AuthStates.IDLE;
      state.error = action.error;
    });

    builder.addCase(authThunks.logout.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(authThunks.logout.fulfilled, () => internalInitialState);

    builder.addCase(authThunks.register.fulfilled, (state, action) => {
      state.emailVerify = action.payload.emailVerify;
      state.error = null;
      state.loading = AuthStates.IDLE;
    });
    builder.addCase(authThunks.register.rejected, (state, action) => {
      state.loading = AuthStates.IDLE;
      state.error = action.payload;
    });

    builder.addCase(authThunks.userVerify.fulfilled, (state, action) => {
      state.isVerified = action.payload.isVerified;
      state.loading = AuthStates.IDLE;
    });
    builder.addCase(authThunks.userVerify.rejected, (state, action) => {
      state.loading = AuthStates.IDLE;
      state.error = action.error;
    });

    builder.addCase(authThunks.userSentVerifyAgain.fulfilled, (state) => {
      state.loading = AuthStates.IDLE;
    });
    builder.addCase(
      authThunks.userSentVerifyAgain.rejected,
      (state, action) => {
        state.loading = AuthStates.IDLE;
        state.error = action.error;
      },
    );
    builder.addCase(authThunks.forgotPassword.fulfilled, (state, action) => {
      state.isVerified = action.payload.isVerified;
      state.loading = AuthStates.IDLE;
    });
    builder.addCase(authThunks.forgotPassword.rejected, (state, action) => {
      state.loading = AuthStates.IDLE;
      state.error = action.error;
    });
  },
});

const {reducer, actions} = authSlice;

export const authSelect = (state: RootState) => state.auth;

export const authActions = {
  ...actions,
  ...authThunks,
};

export default reducer;
