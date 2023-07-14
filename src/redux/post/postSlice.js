import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    isLoading: false,
    error: null,
  };

  export const postsSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
      extraReducers: builder => {
    builder
      .addCase(addPost.pending, state => {
        state.isLoading = true;
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.list = payload;
      })
      .addCase(addPost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
  },
}});
