import { IOrderDetails } from "Interfaces/order.interface";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },

    taxPrice: {
      type: Number,
      default: 0.0,
      required: true,
    },
    shippingPrice: {
      type: Number,
      default: 0.0,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
      required: true,
    },
    itemsPrice: {
      type: Number,
    },
    isPaid: {
      type: Boolean,

      required: false,
    },
    paidAt: {
      type: Number,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Order: mongoose.Model<IOrderDetails> = mongoose.model<IOrderDetails>(
  "Order",
  orderSchema
);

export default Order;
