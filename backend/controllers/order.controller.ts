import { Request, Response, NextFunction } from "express";
import Order from "../models/order.model";
import { IOrderDetails } from "../Interfaces/order.interface";

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
      const order = new Order({
        orderItems,
        user: req.user?._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      order.populate("user", "name email");

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
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
      order.isDelivered = true;
      order.deliveredAt = Date.now();

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