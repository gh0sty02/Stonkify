import mongoose from "mongoose";

interface IOrder {
  name: { type: String };
  qty: { type: Number };
  image: { type: String };
  price: { type: Number };
  _id: mongoose.Schema.Types.ObjectId;
}

export interface IOrderDetails extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;

  orderItems: [IOrder];

  shippingAddress: {
    address: String;
    city: String;
    postalCode: String;
    country: String;
  };

  paymentMethod: String;

  itemsPrice: number;

  taxPrice: Number;

  shippingPrice: Number;

  totalPrice: Number;

  isPaid: Boolean;

  paidAt: number;

  isDelivered: Boolean;

  deliveredAt: number;
}
