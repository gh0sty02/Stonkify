import { FC, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetails } from "reducers/asyncActions/productActions";
import { cartInit, shippingAddressInit } from "reducers/cartSlice";
import { clearReviews } from "reducers/productReviewSlice";
import { userInit } from "reducers/userInfoSlice";
import ProductScreen from "screens/ProductScreen";
import {
  getProduct,
  getRunningOperationPromises,
  productsApi,
  useGetProductQuery,
} from "services/productsApi";
import Loader from "src/components/Loader";
import { AppState, wrapper } from "store";
import { initData } from "utils/initData";

const ProductDetails: FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();

  const { review, loading, success } = useSelector(
    (state: AppState) => state.productReview
  );

  const { isLoading, isError, data: product } = useGetProductQuery(id);

  const { user, cartItems, shippingAddress } = initData();

  useEffect(() => {
    if (user) {
      dispatch(userInit(user));
    }

    if (cartItems) {
      dispatch(cartInit(cartItems));
    }
    if (shippingAddress) {
      dispatch(shippingAddressInit(shippingAddress));
    }
  }, [user, shippingAddress, cartItems]);

  useEffect(() => {
    if (success) {
      alert("Review Submitted Successfully");
      dispatch(clearReviews());
      // dispatch(getProductDetails(id));
    }
  }, [success]);

  return (
    <div>
      {isLoading && <Loader />}
      {product && <ProductScreen id={id} product={product} />}
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const id = params?.id as string;
      console.log(id);
      store.dispatch(getProduct.initiate(id));

      await Promise.all(getRunningOperationPromises());

      return {
        props: {
          id,
        },
      };
    }
);

export default ProductDetails;
