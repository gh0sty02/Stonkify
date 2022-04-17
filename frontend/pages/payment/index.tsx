import Head from "next/head";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import { cartInit, shippingAddressInit } from "reducers/cartSlice";
import { userInit } from "reducers/userInfoSlice";
import PaymentScreen from "screens/PaymentMethodScreen";
import { initData } from "utils/initData";

const PaymentMethod = () => {
  // const { user, cartItems, shippingAddress, paymentMethod } = initData();
  const dispatch = useDispatch();

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
  // }, [user, cartItems, shippingAddressInit]);
  return (
    <Fragment>
      <Head>
        <title>Stonkify | Payment Method</title>
      </Head>
      <div>
        <PaymentScreen />
      </div>
    </Fragment>
  );
};

export default PaymentMethod;
