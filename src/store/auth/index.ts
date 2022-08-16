import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';

import {RootState} from '~/types';

import {authReducer} from '../constants';
import {LoadingStates} from '../types';

import * as authThunks from './thunks';
import {AuthSliceState, UpdateAccessTokenAction} from './types';

const internalInitialState: AuthSliceState = {
  error: null,
  loading: LoadingStates.IDLE,
  registerLoading: LoadingStates.IDLE,
  updateUserLoading: LoadingStates.IDLE,
  resetPasswordLoading: LoadingStates.IDLE,
  changePasswordLoading: LoadingStates.IDLE,
  forgotPasswordLoading: LoadingStates.IDLE,
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
      state.loading = LoadingStates.REJECTED;
      state.error = action.error;
    });
    builder.addCase(authThunks.loginWithToken.pending, (state) => {
      state.loading = LoadingStates.LOADING;
    });
    builder.addCase(authThunks.loginWithToken.fulfilled, (state, action) => {
      state.error = null;
      state.userInfo = action.payload.userInfo;
      state.accessToken = action.payload.accessToken;
      state.loading = LoadingStates.IDLE;
    });
    builder.addCase(authThunks.loginWithToken.rejected, (state, action) => {
      state.loading = LoadingStates.PENDING;
      state.error = action.error;
    });

    builder.addCase(authThunks.logout.pending, (state) => {
      state.loading = LoadingStates.LOADING;
    });
    builder.addCase(authThunks.logout.fulfilled, () => internalInitialState);
    builder.addCase(authThunks.register.pending, (state) => {
      state.registerLoading = LoadingStates.LOADING;
    });
    builder.addCase(authThunks.register.fulfilled, (state, action) => {
      state.emailVerify = action.payload.emailVerify;
      state.error = null;
      state.registerLoading = LoadingStates.IDLE;
    });
    builder.addCase(authThunks.register.rejected, (state, action) => {
      state.registerLoading = LoadingStates.REJECTED;
      state.error = action.payload;
    });

    builder.addCase(authThunks.userVerify.pending, (state) => {
      state.loading = LoadingStates.LOADING;
    });
    builder.addCase(authThunks.userVerify.fulfilled, (state, action) => {
      state.isVerified = action.payload.isVerified;
      state.loading = LoadingStates.IDLE;
    });
    builder.addCase(authThunks.userVerify.rejected, (state, action) => {
      state.loading = LoadingStates.REJECTED;
      state.error = action.error;
    });
    builder.addCase(authThunks.userSentVerifyAgain.pending, (state) => {
      state.loading = LoadingStates.LOADING;
    });
    builder.addCase(authThunks.userSentVerifyAgain.fulfilled, (state) => {
      state.loading = LoadingStates.IDLE;
    });
    builder.addCase(
      authThunks.userSentVerifyAgain.rejected,
      (state, action) => {
        state.loading = LoadingStates.REJECTED;
        state.error = action.error;
      },
    );
    builder.addCase(authThunks.forgotPassword.pending, (state) => {
      state.forgotPasswordLoading = LoadingStates.LOADING;
    });
    builder.addCase(authThunks.forgotPassword.fulfilled, (state, action) => {
      state.isVerified = action.payload.isVerified;
      state.forgotPasswordLoading = LoadingStates.IDLE;
    });
    builder.addCase(authThunks.forgotPassword.rejected, (state, action) => {
      state.forgotPasswordLoading = LoadingStates.REJECTED;
      state.error = action.error;
    });
    builder.addCase(authThunks.resetPassword.pending, (state) => {
      state.resetPasswordLoading = LoadingStates.LOADING;
    });
    builder.addCase(authThunks.resetPassword.fulfilled, (state, action) => {
      state.error = null;
      state.isVerified = action.payload.isVerified;
      state.resetPasswordLoading = LoadingStates.IDLE;
    });
    builder.addCase(authThunks.resetPassword.rejected, (state, action) => {
      state.resetPasswordLoading = LoadingStates.REJECTED;
      state.error = action.error;
    });
    builder.addCase(authThunks.changePassword.pending, (state) => {
      state.changePasswordLoading = LoadingStates.LOADING;
    });
    builder.addCase(authThunks.changePassword.fulfilled, (state, action) => {
      state.error = null;
      state.isVerified = action.payload.isVerified;
      state.changePasswordLoading = LoadingStates.IDLE;
    });
    builder.addCase(authThunks.changePassword.rejected, (state, action) => {
      state.changePasswordLoading = LoadingStates.REJECTED;
      state.error = action.error;
    });
    builder.addCase(authThunks.updateUser.pending, (state) => {
      state.updateUserLoading = LoadingStates.LOADING;
    });
    builder.addCase(authThunks.updateUser.rejected, (state, action) => {
      state.updateUserLoading = LoadingStates.REJECTED;
      state.error = action.error;
    });
    builder.addCase(authThunks.updateUser.fulfilled, (state) => {
      state.error = null;
      state.updateUserLoading = LoadingStates.IDLE;
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
