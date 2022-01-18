import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IBaseProduct, IProduct } from "../../interfaces/products.interface";

export const getProductDetails = createAsyncThunk(
  "product-details/get-products",
  async (cartId: string, thunkApi) => {
    try {
      const { data }: { data: Partial<IProduct> } = await axios.get(
        `${process.env.BACKEND_URL}/api/products/${cartId}`
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

export const getCurrentProduct = createAsyncThunk(
  "adminAction/get-product",
  async (cartId: string, thunkApi) => {
    try {
      const { data }: { data: IProduct } = await axios.get(
        `${process.env.BACKEND_URL}/api/products/${cartId}`
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

export const getAllProducts = createAsyncThunk(
  "product-list/getAllProducts",
  async (requestData: { keyword: string; pageNumber: number }, thunkApi) => {
    try {
      const {
        data,
      }: {
        data: {
          products: IProduct[];
          page: number;
          pages: number;
        };
      } = await axios.get(
        `${process.env.BACKEND_URL}/api/products?keyword=${
          requestData.keyword ? requestData.keyword : ""
        }&pageNumber=${requestData.pageNumber ? requestData.pageNumber : 1}`
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

export const deleteProduct = createAsyncThunk(
  "deleteProduct/delete-product",
  async (requestData: { productId: string; token: string }, thunkApi) => {
    try {
      const { data } = await axios.delete(
        `${process.env.BACKEND_URL}/api/products/${requestData.productId}`,
        {
          headers: {
            Authorization: `Bearer ${requestData.token}`,
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

export const createProduct = createAsyncThunk(
  "createProduct/create-product",
  async (token: string, thunkApi) => {
    try {
      const { data } = await axios.post(
        `${process.env.BACKEND_URL}/api/products/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
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

export const updateProduct = createAsyncThunk(
  "adminAction/update-product",
  async (
    requestData: {
      product: Partial<IBaseProduct>;
      token: string;
      productId: string;
    },
    thunkApi
  ) => {
    try {
      const { data }: { data: IProduct } = await axios.put(
        `${process.env.BACKEND_URL}/api/products/${requestData.productId}`,
        requestData.product,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${requestData.token}`,
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

export const getTopRatedProducts = createAsyncThunk(
  "top-products/get",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${process.env.BACKEND_URL}/api/products/top`
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
