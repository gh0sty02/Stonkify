import { Request, Response, NextFunction } from "express";
import Order from "../models/order.model";
import { IOrderDetails } from "../Interfaces/order.interface";
import mongoose from "mongoose";
import User from "../models/user.model";

// @desc    Create a new Order
// @route     POST /api/products/
// @access  Private

export const addOrderItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    }: IOrderDetails = req.body;

    if (!orderItems) {
      res.status(400);
      throw new Error("No order Items");
    } else {
      // creating a session to begin a transaction
      const session = await mongoose.startSession({
        defaultTransactionOptions: {
          writeConcern: { w: "majority" },
          readConcern: { level: "majority" },
        },
      });
      session.startTransaction();
      try {
        const order = await new Order(
          {
            orderItems,
            user: req.user?._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          },
          session
        );
        const createdOrder = await order.save({ session });
        const user = await User.findById(order.user).session(session);
        await user?.orders.push(createdOrder._id);
        await user?.save({ session });

        // populating order user with the name and email
        await order.populate("user", "name email");

        await session.commitTransaction();
        res.status(201).json(order);
      } catch (error) {
        session.abortTransaction();
        throw error;
      }
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get Order By Order Id
// @route   GET /api/products/:id
// @access  Private

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Order not found ");
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get logged in User's Orders
// @route   GET /api/products/myorders
// @access  Private

export const getMyOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find({ user: req.user?._id });

    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404);
      throw new Error("Orders not found ");
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Update the order to Paid
// @route   PUT /api/products/:id/pay
// @access  Private

export const updateOrderToPaid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      // setting the order to paid
      order.isPaid = true;
      order.paidAt = Date.now();

      const updatedOrder = await order.save();

      return res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update the order to Paid
// @route   PUT /api/products/:id/pay
// @access  Private

export const updateOrderToDelivered = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      // setting the order to delivered and assigning the delivery date
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      console.log(order);
      const updatedOrder = await order.save();

      return res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Delete all User Items
// @route     Delete /api/products/
// @access  Private
export const deleteAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // creating a session to start a database transaction
    const session = await mongoose.startSession({
      defaultTransactionOptions: {
        writeConcern: { w: "majority" },
        readConcern: { level: "majority" },
      },
    });
    session.startTransaction();
    try {
      const user = await User.findById(req.user?._id).session(session);

      // setting user orders to []
      await user?.orders.splice(0, user?.orders.length);
      await Order.deleteMany({ user: req.user?._id }, { session });
      await user?.save({ session });

      // commiting the transaction
      await session.commitTransaction();
      res.status(201).json(user);
    } catch (error) {
      // aborting the transaction if any error occurs
      session.abortTransaction();
      throw new Error(error.message);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Orders
// @route   GET /api/products/:id
// @access  Private

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find().populate("user", "name email");

    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404);
      throw new Error("No Orders found ");
    }
  } catch (err) {
    next(err);
  }
};
