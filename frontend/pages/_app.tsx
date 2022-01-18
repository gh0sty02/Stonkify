import "styles/globals.css";
import type { AppProps } from "next/app";

import Header from "components/Header";
import Footer from "components/Footer";
import "styles/bootstrap.min.css";
import { FC } from "react";
import { wrapper } from "store";

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
