import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "interfaces/user.interface";
import { userApi } from "services/userApi";

import { AppState } from "store";

interface IAuthIntialState {
  user: null | Partial<IUser>;
  token: null | string;
}

const initialState: IAuthIntialState = { user: null, token: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: Partial<IUser>; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
    userInit: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout, userInit } = authSlice.actions;
