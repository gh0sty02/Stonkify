import { GetServerSidePropsContext } from "next";
import { FC, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getAllProducts } from "reducers/asyncActions/productActions";
import ListProducts from "src/components/ListProducts";
import Loader from "src/components/Loader";
import Paginate from "src/components/Paginate";
import { AppState, wrapper } from "store";

const ProductsPage: FC<{ page: number }> = ({ page }) => {
  const dispatch = useDispatch();
  const { products, pages, loading } = useSelector(
    (state: AppState) => state.productList
  );

  useEffect(() => {
    if (page) {
      dispatch(getAllProducts({ keyword: "", pageNumber: page }));
    }
  }, [page]);

  return (
    <Container>
      <h1>Products</h1>
      {loading && <Loader />}
      <ListProducts products={products} loading={loading} />
      <Paginate pages={pages} page={page}></Paginate>
    </Container>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (context.query?.page) {
    const page = Number(context.query.page[0]);

    return {
      props: {
        page,
      },
    };
  } else {
    return {
      props: {
        page: 1,
      },
    };
  }
};

export default ProductsPage;
