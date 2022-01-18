import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "interfaces/products.interface";

export const addToCart = createAsyncThunk(
  "cart/addItem",
  async (cartData: { id: string; qty: number }, thunkApi) => {
    try {
      const { data }: { data: Partial<IProduct> } = await axios.get(
        `${process.env.BACKEND_URL}/api/products/${cartData.id}`
      );

      return {
        _id: data._id as string,
        name: data.name as string,
        image: data.image as string,
        price: data.price as number,
        countInStock: data.countInStock as number,
        qty: cartData.qty as number,
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
