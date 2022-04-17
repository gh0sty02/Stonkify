import Head from "next/head";
import router from "next/router";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cartInit, shippingAddressInit } from "reducers/cartSlice";
import { userInit } from "reducers/userInfoSlice";
import ShippingScreen from "screens/ShippingScreen";
import { useLoginMutation } from "services/userApi";
import { AppState } from "store";
import { initData } from "utils/initData";

const Shipping = () => {
  const dispatch = useDispatch();

  const [_, { isLoading, isError }] = useLoginMutation();
  const { user } = useSelector((state: AppState) => state.auth);

  // const { cartItems, shippingAddress } = initData();

  // useEffect(() => {
  //   if (user) {
  //     dispatch(userInit(user));
  //   } else {
  //     router.push("/login");
  //     return;
  //   }

  //   if (cartItems) {
  //     dispatch(cartInit(cartItems));
  //   }
  //   if (shippingAddress) {
  //     dispatch(shippingAddressInit(shippingAddress));
  //   }
  // }, [user, cartItems, shippingAddress]);

  return (
    <Fragment>
      <Head>
        <title>Stonkify | Shipping Details</title>
      </Head>
      <div>
        <ShippingScreen
        // cartItems={cartItems}
        // shippingAddress={shippingAddress}
        />
      </div>
    </Fragment>
  );
};

export default Shipping;
