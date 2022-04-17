import { ICartDetails } from "./cart.interface";
import { IOrderDetails } from "./order.interface";

export default interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  orders: IOrderDetails[];
  cartItems: ICartDetails[];
}
