import Head from "next/head";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartInit } from "reducers/cartSlice";
import CartScreen from "screens/CartScreen";
import {
  getAllCartItems as getAllCartItemsServer,
  getRunningOperationPromises,
  useGetAllCartItemsMutation,
} from "services/cartApi";
import { AppState, makeStore, wrapper } from "store";
import { parseCookies } from "utils/cookieParser";
import cookie from "cookie";
import { initUser } from "utils/initData";
import { getSession, useSession } from "next-auth/react";
import { ICartItem } from "interfaces/cart.interface";
import Loader from "src/components/Loader";

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
  console.log(cartItems);
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
