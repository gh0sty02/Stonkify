import { memo, useEffect, useMemo } from "react";
import type { NextPage } from "next";
import HomeScreen from "screens/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import { getTopRatedProducts } from "reducers/asyncActions/productActions";
import { userInit } from "reducers/userInfoSlice";
import { cartInit, shippingAddressInit } from "reducers/cartSlice";
import { AppState, makeStore, wrapper } from "store";
import { initData } from "utils/initData";
import { useRouter } from "next/router";
import Head from "next/head";
import Loader from "src/components/Loader";
import { resetOrders } from "reducers/orderSlice";
import {
  useGetAllProductsQuery,
  useGetTopRatedProductsQuery,
  getAllProducts,
  getRunningOperationPromises,
} from "services/productsApi";
import { IProduct } from "interfaces/products.interface";

const Home: NextPage<{
  products: IProduct[];
  topRatedProducts: IProduct[];
}> = ({ products, topRatedProducts }) => {
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
            <HomeScreen
              products={data.products}
              topRatedProducts={topRatedProducts}
              keyword={keyword}
            />
          )}
        </Container>
      </main>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<{
  products: {
    products: IProduct[];
    page: number;
    pages: number;
  } | null;
  topRatedProducts: IProduct[] | null;
}>((store) => async ({ params }) => {
  const store = makeStore();

  const data = await (
    await store.dispatch(
      getAllProducts.initiate({ pageNumber: 1, keyword: "" })
    )
  ).data;

  if (data) {
    await Promise.all(getRunningOperationPromises());

    let productsArray: IProduct[] = [];
    Object.values(data.products).forEach((product) => {
      productsArray.push(product);
    });

    productsArray.sort((a, b) => b.rating - a.rating);

    return {
      props: {
        products: data,
        topRatedProducts: productsArray.slice(0, 3),
      },
    };
  } else {
    return {
      props: {
        products: null,
        topRatedProducts: null,
      },
    };
  }
});

export default memo(Home);
