import { useEffect } from "react";
import type { NextPage } from "next";
import HomeScreen from "screens/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import {
  getAllProducts,
  getTopRatedProducts,
} from "reducers/asyncActions/productActions";
import { userInit } from "reducers/userInfoSlice";
import { cartInit, shippingAddressInit } from "reducers/cartSlice";
import { AppState } from "store";
import { initData } from "utils/initData";
import { useRouter } from "next/router";
import Head from "next/head";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pageNumber = Number(router.query.pageNumber) || 1;
  const keyword = (router.query.keyword as string) || "";
  useEffect(() => {
    dispatch(getAllProducts({ keyword, pageNumber }));
    dispatch(getTopRatedProducts());
  }, []);

  const { user, cartItems, shippingAddress } = initData();

  useEffect(() => {
    if (user) {
      dispatch(userInit(user));
    }

    if (cartItems) {
      dispatch(cartInit(cartItems));
    }
    if (shippingAddress) {
      dispatch(shippingAddressInit(shippingAddress));
    }
  }, [user, cartItems, shippingAddressInit]);

  const { products, loading, error } = useSelector(
    (state: AppState) => state.productList
  );

  return (
    <>
      <Head>
        <title>Welcome to Stonkify | Home</title>
        <meta
          name="description"
          content="We Sell best Products for Cheap Price"
        />
        <meta
          name="keywords"
          content="electronics, buy cheap electronics, buy electronics"
        />
      </Head>
      <main className="py-3">
        <Container>
          {loading && !products && !error && <p>Loading...</p>}

          {products && !loading && (
            <HomeScreen products={products} keyword={keyword} />
          )}
        </Container>
      </main>
    </>
  );
};

export default Home;
