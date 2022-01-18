import { createSlice } from "@reduxjs/toolkit";

import IUser from "interfaces/user.interface";
import {
  deleteUser,
  getUserDetails,
  getUsers,
  updateUser,
} from "reducers/asyncActions/userActions";

interface InitialStateType {
  users: IUser[];
  success: boolean;
  loading: boolean;
  error: any;
  user: IUser | null;
}

const initialState: InitialStateType = {
  success: false,
  loading: false,
  error: null,
  users: [],
  user: null,
};

export const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    setUserSuccessFalse: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.success = true;
      state.loading = false;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload.data;
      state.loading = false;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.loading = false;
    });
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export const { setUserSuccessFalse } = adminUserSlice.actions;
