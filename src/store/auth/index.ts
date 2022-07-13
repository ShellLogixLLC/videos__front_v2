import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';

import {RootState} from '~/types';

import {authReducer} from '../constants';
import {LoadingStates} from '../types';

import * as authThunks from './thunks';
import {AuthSliceState, UpdateAccessTokenAction} from './types';

const internalInitialState: AuthSliceState = {
  error: null,
  loading: LoadingStates.IDLE,
  userInfo: null,
  accessToken: '',
  emailVerify: '',
  isVerified: false,
};

const authSlice = createSlice({
  name: authReducer,
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(state, action: PayloadAction<UpdateAccessTokenAction>) {
      state.accessToken = action.payload.token;
    },

    updateErrorAndIsVerified(state) {
      state.error = null;
      state.isVerified = false;
    },

    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(authThunks.login.pending, (state) => {
      state.loading = LoadingStates.LOADING;
    });
    builder.addCase(authThunks.login.fulfilled, (state, action) => {
      state.error = null;
      state.userInfo = action.payload.userInfo;
      state.accessToken = action.payload.accessToken;
      state.loading = LoadingStates.IDLE;
    });
    builder.addCase(authThunks.login.rejected, (state, action) => {
      state.loading = LoadingStates.IDLE;
      state.error = action.error;
    });

    builder.addCase(authThunks.loginWithToken.fulfilled, (state, action) => {
      state.error = null;
      state.userInfo = action.payload.userInfo;
      state.accessToken = action.payload.accessToken;
      state.loading = LoadingStates.IDLE;
    });
    builder.addCase(authThunks.loginWithToken.rejected, (state, action) => {
      state.loading = LoadingStates.IDLE;
      state.error = action.error;
    });

    builder.addCase(authThunks.logout.pending, (state) => {
      state.loading = LoadingStates.LOADING;
    });
    builder.addCase(authThunks.logout.fulfilled, () => internalInitialState);

    builder.addCase(authThunks.register.fulfilled, (state, action) => {
      state.emailVerify = action.payload.emailVerify;
      state.error = null;
      state.loading = LoadingStates.IDLE;
    });
    builder.addCase(authThunks.register.rejected, (state, action) => {
      state.loading = LoadingStates.IDLE;
      state.error = action.payload;
    });

    builder.addCase(authThunks.userVerify.fulfilled, (state, action) => {
      state.isVerified = action.payload.isVerified;
      state.loading = LoadingStates.IDLE;
    });
    builder.addCase(authThunks.userVerify.rejected, (state, action) => {
      state.loading = LoadingStates.IDLE;
      state.error = action.error;
    });

    builder.addCase(authThunks.userSentVerifyAgain.fulfilled, (state) => {
      state.loading = LoadingStates.IDLE;
    });
    builder.addCase(
      authThunks.userSentVerifyAgain.rejected,
      (state, action) => {
        state.loading = LoadingStates.IDLE;
        state.error = action.error;
      },
    );
    builder.addCase(authThunks.forgotPassword.fulfilled, (state, action) => {
      state.isVerified = action.payload.isVerified;
      state.loading = LoadingStates.IDLE;
    });
    builder.addCase(authThunks.forgotPassword.rejected, (state, action) => {
      state.loading = LoadingStates.IDLE;
      state.error = action.error;
    });

    builder.addCase(authThunks.resetPassword.fulfilled, (state, action) => {
      state.error = null;
      state.isVerified = action.payload.isVerified;
      state.loading = LoadingStates.IDLE;
    });
    builder.addCase(authThunks.resetPassword.rejected, (state, action) => {
      state.loading = LoadingStates.IDLE;
      state.error = action.error;
    });

    builder.addCase(authThunks.changePassword.fulfilled, (state, action) => {
      state.error = null;
      state.isVerified = action.payload.isVerified;
      state.loading = LoadingStates.IDLE;
    });
    builder.addCase(authThunks.changePassword.rejected, (state, action) => {
      state.loading = LoadingStates.IDLE;
      state.error = action.error;
    });
    builder.addCase(authThunks.updateUser.rejected, (state, action) => {
      state.loading = LoadingStates.IDLE;
      state.error = action.error;
    });
    builder.addCase(authThunks.updateUser.fulfilled, (state, action) => {
      state.error = null;
      state.loading = LoadingStates.IDLE;
    });
  },
});

const {reducer, actions} = authSlice;

export const authSelect = (state: RootState): AuthSliceState => state.auth;

export const authState = createSelector(authSelect, (state) => state);

export const authActions = {
  ...actions,
  ...authThunks,
};

export default reducer;
