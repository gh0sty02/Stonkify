import IUser from "interfaces/user.interface";
import { IProduct } from "interfaces/products.interface";
import { IOrder, IShippingAddress } from "interfaces/orderUtils.interface";

const initData = () => {
  let user: Partial<IUser> | undefined;
  let cartItems: IProduct[] | undefined;
  let shippingAddress: IShippingAddress | undefined;
  let paymentMethod: string | undefined;
  let order: IOrder | undefined;

  if (typeof window !== "undefined") {
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user") as string);
    }
    if (localStorage.getItem("order")) {
      order = JSON.parse(localStorage.getItem("order") as string);
    }
    if (localStorage.getItem("paymentMethod")) {
      paymentMethod = localStorage.getItem("paymentMethod") as string;
    }
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems") as string);
    }
    if (localStorage.getItem("shippingAddress")) {
      shippingAddress = JSON.parse(
        localStorage.getItem("shippingAddress") as string
      );
    }
  }

  return { user, cartItems, shippingAddress, paymentMethod, order };
};
export { initData };
