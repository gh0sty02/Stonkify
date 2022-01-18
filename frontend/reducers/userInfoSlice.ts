import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IUser from "interfaces/user.interface";
import { login, register, updateProfile } from "./asyncActions/userActions";

export type userInfo = {
  user: Partial<IUser> | null;
  loading: boolean;
  error: any;
  updateSuccess?: boolean;
};

const initialState: userInfo = {
  user: null,
  loading: false,
  error: null,
  updateSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInit: (state, { payload }: PayloadAction<Partial<IUser>>) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.loading = false;
    });
    builder.addCase(login.pending, (state, { payload }) => {
      state.loading = true;
    }),
      builder.addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.loading = false;
    });
    builder.addCase(register.pending, (state, { payload }) => {
      state.loading = true;
    }),
      builder.addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.loading = false;
      state.updateSuccess = true;
    });
    builder.addCase(updateProfile.pending, (state, { payload }) => {
      state.loading = true;
    }),
      builder.addCase(updateProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { userInit, logout } = userSlice.actions;
