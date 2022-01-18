import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetails } from "reducers/asyncActions/productActions";
import { cartInit, shippingAddressInit } from "reducers/cartSlice";
import { clearReviews } from "reducers/productReviewSlice";
import { userInit } from "reducers/userInfoSlice";
import ProductScreen from "screens/ProductScreen";
import { AppState, wrapper } from "store";
import { initData } from "utils/initData";

const ProductDetails: FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();

  const { review, loading, success } = useSelector(
    (state: AppState) => state.productReview
  );

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
      dispatch(getProductDetails(id));
    }
  }, [success]);

  return (
    <div>
      <ProductScreen id={id} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const id = params?.id as string;
      await store.dispatch(getProductDetails(id));

      return {
        props: {
          id,
        },
      };
    }
);

export default ProductDetails;
