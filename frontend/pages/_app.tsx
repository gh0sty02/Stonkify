import "styles/globals.css";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import React, { useEffect } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import "styles/bootstrap.min.css";
import { AppState, makeStore, wrapper } from "store";
import {
  tokenLogin,
  getRunningOperationPromises as getRunningOperationPromisesUsers,
  useTokenLoginMutation,
} from "services/userApi";
import {
  getAllCartItems,
  getRunningOperationPromises as getRunningOperationPromisesCart,
  useGetAllCartItemsMutation,
} from "services/cartApi";
import { CookiesProvider } from "react-cookie";
import cookie from "cookie";
import { parseCookies } from "utils/cookieParser";
import { Request, Response } from "express";
import { NextApiRequest, NextPage, NextPageContext } from "next";
import { cartInit } from "reducers/cartSlice";
import { setCredentials } from "reducers/authSlice";
import { wrap } from "module";
import { ICartItem, ICartItemDetails } from "interfaces/cart.interface";
import App from "next/app";
import { IncomingMessage } from "http";
import { useDispatch, useSelector } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";
import IUser from "interfaces/user.interface";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // const [tokenLogin] = useTokenLoginMutation();
  // const [getAllCartItems] = useGetAllCartItemsMutation();
  // const dispatch = useDispatch();

  // const initData = async (token: string) => {
  //   const cart = await getAllCartItems(token);
  //   const user = await tokenLogin({ token });
  //   if ("data" in cart && "data" in user) {
  //     dispatch(cartInit(cart.data));
  //     dispatch(setCredentials({ user: user.data, token }));
  //   }
  // };

  const { cartItems } = useSelector((state: AppState) => state.cart);
  const { user: stateUser } = useSelector((state: AppState) => state.auth);

  return (
    <SessionProvider session={session}>
      <CookiesProvider>
        <Header totalCartItems={cartItems.length} stateUser={stateUser} />
        <Component {...pageProps} />
        <Footer />
      </CookiesProvider>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
