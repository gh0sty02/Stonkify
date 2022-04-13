import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "interfaces/user.interface";
import { AppState } from "store";

interface IAuthIntialState {
  user: null | IUser;
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
      }: PayloadAction<{ user: IUser; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;
