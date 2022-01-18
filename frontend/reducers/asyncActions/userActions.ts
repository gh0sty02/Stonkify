import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import IUser from "../../interfaces/user.interface";
import { AppState } from "../../store";

interface ILoginFormData {
  email: string;
  password: string;
}

interface IFormData {
  name: string;
  email: string;
  password: string;
  token?: string;
}

export const login = createAsyncThunk(
  "user/login",
  async (formData: ILoginFormData, thunkApi) => {
    try {
      const { data }: { data: Partial<IUser> } = await axios.post(
        `${process.env.BACKEND_URL}/api/users/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(data));

      return {
        data,
      };
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const register = createAsyncThunk(
  "user/register",
  async (formData: IFormData, thunkApi) => {
    try {
      const { data }: { data: Partial<IUser> } = await axios.post(
        `${process.env.BACKEND_URL}/api/users`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(data));

      return {
        data,
      };
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/update-profile",
  async (formData: IFormData, thunkApi) => {
    try {
      const { data }: { data: Partial<IUser> } = await axios.put(
        `${process.env.BACKEND_URL}/api/users/profile`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${formData.token}`,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(data));

      return {
        data,
      };
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getUsers = createAsyncThunk(
  "adminAction/get-users",
  async (token: string, thunkApi) => {
    try {
      const { data }: { data: IUser[] } = await axios.get(
        `${process.env.BACKEND_URL}/api/users/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        data,
      };
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "adminAction/delete-user",
  async (requestData: { id: string; token: string }, thunkApi) => {
    try {
      const { data }: { data: IUser[] } = await axios.delete(
        `${process.env.BACKEND_URL}/api/users/${requestData.id}`,
        {
          headers: {
            Authorization: `Bearer ${requestData.token}`,
          },
        }
      );

      return {
        data,
      };
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "adminAction/get-user",
  async (requestData: { id: string; token: string }, thunkApi) => {
    try {
      const { data }: { data: IUser } = await axios.get(
        `${process.env.BACKEND_URL}/api/users/${requestData.id}`,
        {
          headers: {
            Authorization: `Bearer ${requestData.token}`,
          },
        }
      );

      return {
        data,
      };
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const updateUser = createAsyncThunk(
  "adminAction/update-user",
  async (
    requestData: { user: Partial<IUser>; id: string; token: string },
    thunkApi
  ) => {
    try {
      const { data }: { data: IUser } = await axios.put(
        `${process.env.BACKEND_URL}/api/users/${requestData.id}`,
        requestData.user,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${requestData.token}`,
          },
        }
      );

      return {
        data,
      };
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(err);
    }
  }
);
