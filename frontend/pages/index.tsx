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
import Loader from "src/components/Loader";
import { resetOrders } from "reducers/orderSlice";
import { useGetAllProductsQuery } from "services/productsApi";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pageNumber = Number(router.query.pageNumber) || 1;
  const keyword = (router.query.keyword as string) || "";
  const { isLoading, isError, data } = useGetAllProductsQuery({
    pageNumber,
    keyword,
  });
  useEffect(() => {
    dispatch(getTopRatedProducts());
    dispatch(resetOrders());
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

  // const { products, loading, error } = useSelector(
  //   (state: AppState) => state.productList
  // );

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
          {isLoading && <Loader />}
          {isLoading && !isError && <p>Loading...</p>}

          {data?.products && !isLoading && (
            <HomeScreen products={data.products} keyword={keyword} />
          )}
        </Container>
      </main>
    </>
  );
};

export default Home;
