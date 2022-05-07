import { IShippingAddress } from "interfaces/orderUtils.interface";
import Head from "next/head";
import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cartInit, shippingAddressInit } from "reducers/cartSlice";
import { userInit } from "reducers/userInfoSlice";
import ShippingScreen from "screens/ShippingScreen";
import { useLoginMutation } from "services/userApi";
import { AppState } from "store";
import { initData } from "utils/initDataOld";

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
