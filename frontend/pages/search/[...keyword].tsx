import { IProduct } from "interfaces/products.interface";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from "services/productsApi";

import ListProducts from "src/components/ListProducts";
import Loader from "src/components/Loader";
import Paginate from "src/components/Paginate";
import { AppState } from "store";

const Products: FC<{ keyword: string; page: number }> = ({ keyword, page }) => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetAllProductsQuery({
    pageNumber: page,
    keyword,
  });
  const products = data?.products;
  const pages = data?.pages;

  return (
    <Fragment>
      <Head>
        <title>Stonkify | Search Products</title>
      </Head>
      <Container>
        <h1>Products</h1>
        {isLoading && <Loader />}
        <Link href="/" passHref>
          <a className="btn btn-light">Go Back</a>
        </Link>

        {products && <ListProducts products={products} loading={isLoading} />}
        {pages && (
          <Paginate pages={pages} page={page} keyword={keyword}></Paginate>
        )}
      </Container>
    </Fragment>
  );
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  if (context.params?.keyword) {
    const params = context.params.keyword as string[];
    const query = params[0].split("&");
    const keywords = query.map((keyword) => keyword.split("=")).flat();
    const searchQuery = keywords[1];
    const page = keywords[3];

    return {
      props: {
        keyword: searchQuery,
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
