import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  cartInit,
  paymentMethodInit,
  shippingAddressInit,
} from "reducers/cartSlice";
import { userInit } from "reducers/userInfoSlice";
import PlaceOrderScreen from "screens/PlaceOrderScreen";
import { AppState } from "store";
import { initData } from "utils/initData";

const PlaceOrder = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { user } = useSelector((state: AppState) => state.auth);
  const { cartItems, shippingAddress, paymentMethod } = initData();
  const { success, order } = useSelector((state: AppState) => state.order);

  useEffect(() => {
    if (success && order) {
      router.push(`/orders/${order?._id}`);
    }
  }, [success, order]);

  useEffect(() => {
    if (user) {
      dispatch(userInit(user));
    }

    if (!user) {
      router.push("/login");
    }

    if (cartItems) {
      dispatch(cartInit(cartItems));
    }
    if (shippingAddress) {
      dispatch(shippingAddressInit(shippingAddress));
    }

    if (paymentMethod) {
      dispatch(paymentMethodInit(paymentMethod));
    }
  }, [order]);

  return (
    <Fragment>
      <Head>
        <title>Stonkify | Order Summary</title>
      </Head>
      <Container>
        <PlaceOrderScreen />
      </Container>
      ;
    </Fragment>
  );
};

export default PlaceOrder;
