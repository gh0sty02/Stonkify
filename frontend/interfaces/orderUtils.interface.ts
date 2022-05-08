import { IProduct } from "interfaces/products.interface";
import { ICartItem, ICartItemDetails } from "./cart.interface";
import IUser from "./user.interface";

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export type cartType = {
  cartItems: ICartItemDetails[];
  shippingAddress?: IShippingAddress | null;
  loading: boolean;
  error: any;
  paymentMethod: string | null;
  tempCartItems: ICartItem[] | null;
};

export interface IOrder {
  _id?: string;

  orderItems: {
    productId: string;
    name: string;
    qty: number;
    price: number;
    image: string;
  }[];

  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  user?: Partial<IUser>;

  paymentMethod: string;

  itemsPrice: number;

  taxPrice: number;

  shippingPrice: number;

  totalPrice: number;

  isPaid: boolean;

  paidAt?: string;

  isDelivered?: Boolean;

  deliveredAt?: string;

  createdAt?: string;
}

export interface ICreateProduct {}

export interface IOrderDetails extends IOrder {
  token: string;
}
