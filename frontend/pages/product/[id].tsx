import { IProduct } from "interfaces/products.interface";
import {
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { getSession, useSession } from "next-auth/react";
import { FC, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetails } from "reducers/asyncActions/productActions";
import { cartInit, shippingAddressInit } from "reducers/cartSlice";
import { clearReviews } from "reducers/productReviewSlice";
import { userInit } from "reducers/userInfoSlice";
import ProductScreen from "screens/ProductScreen";
import {
  getAllProducts,
  getProduct,
  getRunningOperationPromises,
  productsApi,
  useGetProductQuery,
} from "services/productsApi";
import { useUpdateUserMutation } from "services/userApi";
import Loader from "src/components/Loader";
import { AppState, makeStore, wrapper } from "store";
import { initData } from "utils/initDataOld";

const ProductDetails: FC<{ id: string; product: IProduct | null }> = ({
  id,
  product,
}) => {
  const dispatch = useDispatch();
  const session = useSession();
  console.log(session);
  const token = session.data?.accessToken as string;

  const { isLoading, isError, data } = useGetProductQuery(id);

  useEffect(() => {
    if (!product) {
      dispatch(getProductDetails(id));
    }
  }, []);

  const { review, loading, success } = useSelector(
    (state: AppState) => state.productReview
  );

  // const { user, cartItems, shippingAddress } = initData();

  // useEffect(() => {
  //   if (success) {
  //     alert("Review Submitted Successfully");
  //     dispatch(clearReviews());
  //     // dispatch(getProductDetails(id));
  //   }
  // }, [success]);

  return (
    <>
      {isLoading && <Loader />}
      {data && <ProductScreen id={id} currentProduct={data} />}
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ params }) => {
//       const id = params?.id as string;
//       store.dispatch(getProduct.initiate(id));
//       await Promise.all(getRunningOperationPromises());
//       return {
//         props: {
//           id,
//         },
//       };
//     }
// );

export const getStaticPaths = async () => {
  const store = makeStore();

  const result = await (
    await store.dispatch(
      getAllProducts.initiate({ pageNumber: 1, keyword: "" })
    )
  ).data;

  if (result) {
    const paths = result.products.map((product) => ({
      params: {
        id: product._id,
      },
    }));

    return {
      paths,
      fallback: false,
    };
  } else {
    return {
      paths: [],
      fallback: false,
    };
  }
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
          revalidate: 10,
        },
      };
    }
  }
});

export default ProductDetails;
