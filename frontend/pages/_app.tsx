import "styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import "styles/bootstrap.min.css";
import { FC } from "react";
import { persistor, wrapper } from "store";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { Provider } from "react-redux";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default wrapper.withRedux(MyApp);
