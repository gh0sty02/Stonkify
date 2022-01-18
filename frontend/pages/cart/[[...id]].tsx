import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { cartInit, shippingAddressInit } from "reducers/cartSlice";
import { userInit } from "reducers/userInfoSlice";
import CartScreen from "screens/CartScreen";
import { initData } from "utils/initData";

const Cart = () => {
  const dispatch = useDispatch();

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
  return (
    <div>
      <Head>
        <title>Stonkify | Cart</title>
      </Head>
      <CartScreen />
    </div>
  );
};

export default Cart;
