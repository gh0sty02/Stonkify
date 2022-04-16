import { IOrder } from "interfaces/orderUtils.interface";
import RequestError from "interfaces/requestError.interface";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "reducers/authSlice";
import { setUserOrders } from "reducers/orderSlice";
import { useGetMyOrdersMutation } from "services/orderApi";

export const useInitUserOrders = async (token: string) => {
  const dispatch = useDispatch();
  const [getMyOrders] = useGetMyOrdersMutation();

  const orders = await getMyOrders({ token });

  if ("data" in orders && !orders.data[0]) {
    dispatch(setUserOrders(orders.data as IOrder[]));
  }
};
