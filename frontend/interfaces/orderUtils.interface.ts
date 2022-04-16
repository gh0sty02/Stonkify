import { IProduct } from "interfaces/products.interface";

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface cartProduct extends IProduct {
  qty: number;
}

export type cartType = {
  cartItems: Partial<cartProduct>[];
  shippingAddress?: IShippingAddress | null;
  loading: boolean;
  error: any;
  paymentMethod: string | null;
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
