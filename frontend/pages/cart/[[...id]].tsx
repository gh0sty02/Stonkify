import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartInit } from "reducers/cartSlice";
import CartScreen from "screens/CartScreen";
import { useGetAllCartItemsMutation } from "services/cartApi";
import { AppState, makeStore, wrapper } from "store";

const Cart = () => {
  const { user, token } = useSelector((state: AppState) => state.auth);
  const [getAllCartItems] = useGetAllCartItemsMutation();
  const dispatch = useDispatch();

  const initalizeCart = async (token: string) => {
    const cart = await getAllCartItems(token);

    if ("data" in cart) {
      dispatch(cartInit(cart.data));
    }
  };

  useEffect(() => {
    if (token) {
      initalizeCart(token);
    }
  }, [token]);

  return (
    <div>
      <Head>
        <title>Stonkify | Cart</title>
      </Head>
      <CartScreen />
    </div>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const store = makeStore();
//     console.log(store.getState().auth.token);

//     // store.dispatch(getAllCartItems.initiate())
//     return {
//       props: {},
//     };
//   }
// );

export default Cart;
