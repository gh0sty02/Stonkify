import { IProduct } from "interfaces/products.interface";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getAllProducts } from "reducers/asyncActions/productActions";
import ListProducts from "src/components/ListProducts";
import Loader from "src/components/Loader";
import Paginate from "src/components/Paginate";
import { AppState } from "store";

const Products: FC<{ keyword: string; page: number }> = ({ keyword, page }) => {
  const dispatch = useDispatch();

  const { products, pages, loading } = useSelector(
    (state: AppState) => state.productList
  );

  useEffect(() => {
    if (keyword) {
      dispatch(getAllProducts({ keyword, pageNumber: page }));
    }
  }, [keyword, page]);
  return (
    <Fragment>
      <Head>
        <title>Stonkify | Search Products</title>
      </Head>
      <Container>
        <h1>Products</h1>
        {loading && <Loader />}
        <Link href="/" passHref>
          <a className="btn btn-light">Go Back</a>
        </Link>

        <ListProducts products={products} loading={loading} />
        <Paginate pages={pages} page={page} keyword={keyword}></Paginate>
      </Container>
    </Fragment>
  );
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  if (context.params?.keyword) {
    const keyword = context.params.keyword[0];
    const page = Number(context.params.keyword[2]);

    return {
      props: {
        keyword,
        page,
      },
    };
  } else {
    return {
      props: {
        keyword: "",
        page: 1,
      },
    };
  }
};

export default Products;
