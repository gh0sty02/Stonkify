export interface ICartItemDetails {
  productId: string;
  qty: number;
  name: string;
  price: number;
  image: string;
}

export interface ICartItem extends ICartItemDetails {
  _id: "string";
}
