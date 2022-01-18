import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrder } from "interfaces/orderUtils.interface";
import { AppState } from "store";
import { cartReset } from "reducers/cartSlice";

interface IOrderDetails extends IOrder {
  token: string;
}

export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData: IOrderDetails, thunkApi) => {
    try {
      const { data }: { data: IOrder } = await axios.post(
        `${process.env.BACKEND_URL}/api/orders/`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${orderData.token}`,
          },
        }
      );

      return {
        ...data,
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

type IData = {
  id: string;
  token: string;
};

export const getOrderDetails = createAsyncThunk(
  "order/find",
  async (params: IData, thunkApi) => {
    try {
      const { data }: { data: IOrder } = await axios.get(
        `${process.env.BACKEND_URL}/api/orders/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );

      return data;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const payOrder = createAsyncThunk(
  "order/pay",
  async (orderData: { id: string; token: string }, thunkApi) => {
    try {
      const { data }: { data: IOrder } = await axios.put(
        `${process.env.BACKEND_URL}/api/orders/${orderData.id}/pay`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${orderData.token}`,
          },
        }
      );

      thunkApi.dispatch(cartReset());

      return data;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const deliverOrder = createAsyncThunk(
  "admin-order/update-delivered",
  async (orderData: { id: string; token: string }, thunkApi) => {
    try {
      const { data }: { data: IOrder } = await axios.put(
        `${process.env.BACKEND_URL}/api/orders/${orderData.id}/deliver`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${orderData.token}`,
          },
        }
      );

      return data;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getMyOrders = createAsyncThunk(
  "order/my-orders",
  async (token: string, thunkApi) => {
    try {
      const { data }: { data: IOrder[] } = await axios.get(
        `${process.env.BACKEND_URL}/api/orders/myorders`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "admin-order/all-orders",
  async (token: string, thunkApi) => {
    try {
      const { data }: { data: IOrder[] } = await axios.get(
        `${process.env.BACKEND_URL}/api/orders/myorders`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(err);
    }
  }
);
