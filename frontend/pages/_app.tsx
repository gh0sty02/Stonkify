import "styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import "styles/bootstrap.min.css";
import { FC } from "react";
import { AppState, makeStore, persistor, wrapper } from "store";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";
import { useTokenLoginMutation } from "services/userApi";
import { useTokenLogin } from "utils/useTokenLogin";
import { setCredentials } from "reducers/authSlice";
import {
  orderApi,
  useGetAllOrdersQuery,
  useGetMyOrdersMutation,
} from "services/orderApi";
import { IOrder } from "interfaces/orderUtils.interface";
import { setUserOrders } from "reducers/orderSlice";
import { useGetAllCartItemsMutation } from "services/cartApi";
import { cartInit } from "reducers/cartSlice";

function MyApp({ Component, pageProps }: AppProps) {
  const [tokenLogin] = useTokenLoginMutation();
  const [getMyOrders] = useGetMyOrdersMutation();
  const [getAllCartItems] = useGetAllCartItemsMutation();
  const dispatch = useDispatch();

  const initializeTokenLogin = async (token: string) => {
    const user = await tokenLogin({ token });

    if ("data" in user) {
      dispatch(
        setCredentials({
          token,
          user: user.data,
        })
      );
    }
  };

  const initalizeCart = async (token: string) => {
    const cart = await getAllCartItems(token);

    if ("data" in cart) {
      dispatch(cartInit(cart.data));
    }
  };

  const useInitUserOrders = async (token: string) => {
    const orders = await getMyOrders({ token });

    if ("data" in orders) {
      dispatch(setUserOrders(orders.data as IOrder[]));
    }
  };

  useEffect(() => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("user");
      if (token) {
        initializeTokenLogin(token);
        initalizeCart(token);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

// MyApp.getInitialProps = async ({ req, res }) => {
//   const store = makeStore();
//   const token = store.getState().auth.token as string;

//   if (token) {
//     res?.setHeader("user", token);

//     console.log("token", res?.getHeader("user"));
//   }
//   console.log("no token");

//   return {
//     props: {
//       token,
//     },
//   };
// };

export default wrapper.withRedux(MyApp);
