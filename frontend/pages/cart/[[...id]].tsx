import { FC, useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { cartInit } from "reducers/cartSlice";

import { ICartItem } from "interfaces/cart.interface";

import { AppState } from "store";
import CartScreen from "screens/CartScreen";

const Cart: FC<{ token: string; cartItems: ICartItem[] }> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCartItems = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
      );
      if (savedCartItems.length > 0) {
        dispatch(cartInit(savedCartItems));
      }
    }
  }, []);

  const { cartItems } = useSelector((state: AppState) => state.cart);

  return (
    <div>
      <Head>
        <title>Stonkify | Cart</title>
      </Head>
      {<CartScreen />}
    </div>
  );
};

export default Cart;
