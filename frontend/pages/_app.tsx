import "styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import "styles/bootstrap.min.css";
import { AppState, wrapper } from "store";

import { CookiesProvider } from "react-cookie";
import { useSelector } from "react-redux";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { cartItems } = useSelector((state: AppState) => state.cart);
  const { user: stateUser } = useSelector((state: AppState) => state.auth);

  return (
    <SessionProvider session={session}>
      <CookiesProvider>
        <Header
          data={{ totalCartItems: cartItems.length, stateUser: stateUser }}
        />
        <Component {...pageProps} />
        <Footer />
      </CookiesProvider>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
