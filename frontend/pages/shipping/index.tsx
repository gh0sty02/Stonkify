import { IShippingAddress } from "interfaces/orderUtils.interface";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { cartInit, shippingAddressInit } from "reducers/cartSlice";

import ShippingScreen from "screens/ShippingScreen";

const Shipping = () => {
  const dispatch = useDispatch();
  const [shippingAddress, setShippingAddress] =
    useState<IShippingAddress | null>(null);

  useEffect(() => {
    const shippingAddress = localStorage.getItem("shippingAddress");
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    if (shippingAddress && cartItems.length > 0) {
      dispatch(shippingAddressInit(JSON.parse(shippingAddress)));
      dispatch(cartInit(cartItems));
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Stonkify | Shipping Details</title>
      </Head>
      <div>
        <ShippingScreen />
      </div>
    </Fragment>
  );
};

export default Shipping;
