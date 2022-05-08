import axios from "axios";
import { IProduct } from "interfaces/products.interface";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductScreen from "screens/ProductScreen";
import {
  getAllProducts,
  getProduct,
  getRunningOperationPromises,
  useGetProductQuery,
} from "services/productsApi";
import Loader from "src/components/Loader";
import { AppState, makeStore, wrapper } from "store";

const ProductDetails: FC<{ id: string; product: IProduct | null }> = ({
  id,
  product,
}) => {
  const session = useSession();

  const router = useRouter();
  const token = session.data?.accessToken as string;

  const { isLoading, isError, data } = useGetProductQuery(id);

  return (
    <>
      {isLoading && <Loader />}
      {router.isFallback && <Loader />}
      {data && <ProductScreen id={id} currentProduct={data} />}
    </>
  );
};

export const getStaticPaths = async (context: GetStaticPropsContext) => {
  const {
    data,
  }: { data: { products: IProduct[]; pages: number; page: number } } =
    await axios.get(`${process.env.BACKEND_URL}/api/products`);
  const paths = data.products.map((product) => ({
    params: {
      id: product._id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps<{
  id: string;
  product: IProduct | null;
  // @ts-ignore
}>((store) => async (context: GetStaticPropsContext) => {
  const id = context.params?.id as string;

  if (id) {
    // const data = (await store.dispatch(getProduct.initiate(id)))
    //   .data as IProduct;
    const data = await store.dispatch(getProduct.initiate(id));
    await Promise.all(getRunningOperationPromises());
    if ("data" in data) {
      return {
        props: {
          id,
          product: data.data,
          revalidate: 600,
        },
      };
    }
  }
});

export default ProductDetails;
