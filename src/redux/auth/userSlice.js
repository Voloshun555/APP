import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  login: null,
  email: null,
  token: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, actions) => {
      state.userId = actions.payload.userId;
      state.login = actions.payload.login;
      state.email = actions.payload.email;
    },
    authStateChange: (state, { payload }) => {
      state.stateChange = payload.stateChange;
    },
    authSignOut: () => initialState,
  },
});
export default authSlice.reducer
export const {updateUser, authSignOut, authStateChange} = authSlice.actions