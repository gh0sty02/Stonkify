import { memo, useEffect, useMemo } from "react";
import type { NextPage } from "next";
import HomeScreen from "screens/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import { useRouter } from "next/router";
import Head from "next/head";
import Loader from "src/components/Loader";

import {
  useGetAllProductsQuery,
  useGetTopRatedProductsQuery,
} from "services/productsApi";

import { tokenLogin, useTokenLoginMutation } from "services/userApi";
import { useSession } from "next-auth/react";

const Home: NextPage<{}> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pageNumber = Number(router.query.pageNumber) || 1;
  const keyword = (router.query.keyword as string) || "";
  const [tokenLogin] = useTokenLoginMutation();
  const {
    isLoading,
    isError,
    data: productsData,
  } = useGetAllProductsQuery({
    pageNumber,
    keyword,
  });
  const session = useSession();
  console.log(session);

  const { data: topProductsData, isLoading: loadingTopProducts } =
    useGetTopRatedProductsQuery();

  // useEffect(() => {
  //   if (token) {
  //     tokenLogin({ token });
  //   }
  // }, [token]);
  // if (token) {
  //   useTokenLogin(token);
  // }

  // useEffect(() => {
  //   dispatch(getTopRatedProducts());
  //   dispatch(resetOrders());
  // }, []);

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

          {productsData?.products && topProductsData && !isLoading && (
            <HomeScreen
              products={productsData.products}
              topRatedProducts={topProductsData}
              keyword={keyword}
            />
          )}
        </Container>
      </main>
    </>
  );
};

export default memo(Home);
