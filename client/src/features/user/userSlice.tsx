import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    signInSucces: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSucces: (state, action) => {
      state.currentUser = action.payload;
      (state.loading = false), (state.error = null);
    },
    upadateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSucces: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    }
  },
});

export const {
  signInStart,
  signInSucces,
  signInFailure,
  updateStart,
  updateSucces,
  upadateFailure,
  deleteUserStart,
  deleteUserFailed,
  deleteUserSuccess,
  signoutSucces
} = userSlice.actions;

export default userSlice.reducer;
