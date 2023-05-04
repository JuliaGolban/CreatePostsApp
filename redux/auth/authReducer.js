import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: null,
  login: null,
  email: null,
  avatar: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userID: payload.userID,
      login: payload.login,
      email: payload.email,
      avatar: payload.avatar,
      stateChange: payload.stateChange,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});
