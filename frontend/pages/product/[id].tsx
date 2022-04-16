import { IProduct } from "interfaces/products.interface";
import {
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
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
import Loader from "src/components/Loader";
import { AppState, makeStore, wrapper } from "store";
import { initData } from "utils/initData";

const ProductDetails: FC<{ id: string; product: IProduct | null }> = ({
  id,
  product,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!product) {
      dispatch(getProductDetails(id));
    }
  }, []);

  const { review, loading, success } = useSelector(
    (state: AppState) => state.productReview
  );

  const { isLoading, isError, data } = useGetProductQuery(id);

  // const { user, cartItems, shippingAddress } = initData();

  // useEffect(() => {
  //   if (user) {
  //     dispatch(userInit(user));
  //   }

  //   if (cartItems) {
  //     dispatch(cartInit(cartItems));
  //   }
  //   if (shippingAddress) {
  //     dispatch(shippingAddressInit(shippingAddress));
  //   }
  // }, [user, shippingAddress, cartItems]);

  // useEffect(() => {
  //   if (success) {
  //     alert("Review Submitted Successfully");
  //     dispatch(clearReviews());
  //     // dispatch(getProductDetails(id));
  //   }
  // }, [success]);

  return (
    <div>
      {isLoading && <Loader />}
      {product && <ProductScreen id={id} product={product} />}
    </div>
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
}>((store) => async (context: GetStaticPropsContext) => {
  const id = context.params?.id as string;

  if (id) {
    const data = (await store.dispatch(getProduct.initiate(id)))
      .data as IProduct;
    await Promise.all(getRunningOperationPromises());

    return {
      props: {
        id,
        product: data,
      },
    };
  } else {
    return {
      props: {
        id: "",
        product: null,
      },
    };
  }
});

export default ProductDetails;
