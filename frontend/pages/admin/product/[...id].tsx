import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import ProductEditScreen from "screens/ProductEditScreen";
import { AppState } from "store";

const ProductEdit = () => {
  const { success, product } = useSelector(
    (state: AppState) => state.adminProductEdit
  );
  const router = useRouter();

  useEffect(() => {
    if (success) {
      router.push("/admin/productList");
    }
  }, [success, product]);

  return (
    <Fragment>
      <Head>
        <title>Stonkify | Edit Product</title>
      </Head>
      <Container>
        <ProductEditScreen />
      </Container>
    </Fragment>
  );
};

export const getServerSideProps = () => {
  return {
    props: {},
  };
};

export default ProductEdit;
