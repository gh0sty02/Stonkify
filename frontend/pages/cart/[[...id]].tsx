import Head from "next/head";
import CartScreen from "screens/CartScreen";

const Cart = () => {
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
