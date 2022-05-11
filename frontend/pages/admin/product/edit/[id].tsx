import React, { FC, Fragment } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { getSession } from "next-auth/react";

import { IProduct } from "interfaces/products.interface";
import IUser from "interfaces/user.interface";

import { wrapper, makeStore } from "store";
import ProductEditScreen from "screens/ProductEditScreen";
import { getProduct } from "services/productsApi";

const EditProduct: FC<{
  token: string;
  product: IProduct;
  productId: string;
  isAdmin: boolean;
}> = ({ token, product, productId, isAdmin }) => {
  return (
    <Fragment>
      <Head>
        <title>Stonkify | Edit Product</title>
      </Head>
      <Container>
        {product && isAdmin && (
          <ProductEditScreen data={{ token, productId, product, isAdmin }} />
        )}
      </Container>
    </Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  //@ts-ignore
  (store) => async (context) => {
    const store = makeStore();
    const productId = context.query.id as string;
    const session = await getSession({ req: context.req });
    const token = session?.accessToken as string;
    const user = session?.user as Partial<IUser>;

    const product = await store.dispatch(getProduct.initiate(productId));

    if (token && user.isAdmin) {
      if ("data" in product) {
        return {
          props: {
            token,
            product: product.data,
            productId,
            isAdmin: user.isAdmin,
          },
        };
      }
    }

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
);

export default EditProduct;
