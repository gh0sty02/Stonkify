import { FC, Fragment } from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { Container } from "react-bootstrap";
import { IProduct } from "interfaces/products.interface";
import IUser from "interfaces/user.interface";

import ProductListScreen from "screens/ProductListScreen";
import { makeStore, wrapper } from "store";
import { getAllProducts } from "services/productsApi";

const ProductList: FC<{
  page: number;
  products: IProduct[];
  token: string;
  isAdmin: boolean;
  pages: number;
}> = ({ page, products, token, isAdmin, pages }) => {
  return (
    <Fragment>
      <Head>
        <title>Stonkify | All Products</title>
      </Head>
      <Container>
        {products && token && page && (
          <ProductListScreen data={{ products, token, page, pages, isAdmin }} />
        )}
      </Container>
    </Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  //@ts-ignore
  (store) => async (context) => {
    const store = makeStore();
    const page = context.query.id as string;
    const session = await getSession({ req: context.req });
    const token = session?.accessToken as string;
    const user = session?.user as Partial<IUser>;

    const products = await store.dispatch(
      getAllProducts.initiate({ keyword: "", pageNumber: parseInt(page) })
    );
    if (token && user.isAdmin) {
      if ("data" in products) {
        return {
          props: {
            token,
            products: products.data?.products,
            pages: products.data?.pages,
            page,
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

export default ProductList;
