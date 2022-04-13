import router from "next/router";
import { FC, Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

import { getAllProducts } from "reducers/asyncActions/productActions";
import { userInit } from "reducers/userInfoSlice";
import ProductListScreen from "screens/ProductListScreen";
import { AppState } from "store";
import { initData } from "utils/initData";
import { resetUpdateProductSucces } from "reducers/adminProductSlice";
import { setCreateProductSuccessFalse } from "reducers/createProductSlice";
import { setDeleteSuccessFalse } from "reducers/deleteProductSlice";

const ProductList: FC<{ page: number }> = ({ page }) => {
  const dispatch = useDispatch();

  const { success: deleteSuccess, loading: deleteLoading } = useSelector(
    (state: AppState) => state.deleteProduct
  );
  const { success: createProductSuccess, createdProduct } = useSelector(
    (state: AppState) => state.createProduct
  );
  const { user } = initData();
  useEffect(() => {
    if (user) {
      dispatch(userInit(user));
    }
    if (!user?.isAdmin) {
      router.push("/");
    }

    if (user?.isAdmin && user?.token) {
      dispatch(getAllProducts({ keyword: "", pageNumber: page }));
    }
  }, []);

  useEffect(() => {
    if (page) {
      dispatch(getAllProducts({ keyword: "", pageNumber: page }));
    }
  }, [page]);

  useEffect(() => {
    if (deleteSuccess && !deleteLoading) {
      dispatch(getAllProducts({ keyword: "", pageNumber: page }));
      dispatch(setDeleteSuccessFalse());
    }
  }, [deleteSuccess, deleteLoading]);

  useEffect(() => {
    if (createProductSuccess && createdProduct) {
      router.push(`/admin/product/${createdProduct._id}/edit`);
      dispatch(resetUpdateProductSucces());
      dispatch(setCreateProductSuccessFalse());
    }
  }, [createProductSuccess, createdProduct]);

  return (
    <Fragment>
      <Head>
        <title>Stonkify | All Products</title>
      </Head>
      <Container>
        <ProductListScreen />
      </Container>
    </Fragment>
  );
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  if (context.params?.productlist) {
    const page = Number(context.params.productlist[1]);
    return {
      props: {
        page,
      },
    };
  }
  return {
    props: {
      page: 1,
    },
  };
};

export default ProductList;
