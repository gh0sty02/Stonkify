import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ICartItem } from "../Interfaces/cart.interface";
import CartItem from "../models/cartItem.model";
import User from "../models/user.model";

// @desc   Add item to cart
// @route  POST /api/cart/
// @access  Private
export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { price, qty, productId, image, name }: ICartItem = req.body;

    // creating a session to begin a transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const cartItem = await CartItem.find({ productId });
      if (cartItem.length > 0) {
        // if a duplicate cart item is found, update the quantity
        await CartItem.updateOne({ productId }, { $inc: { qty: qty } });

        await session.commitTransaction();
        return res.status(200).json(cartItem);
      } else {
        // create a new cart item
        const newCartItem = new CartItem(
          {
            productId,
            price,
            qty,
            image,
            name,
          },
          { session }
        );
        await newCartItem.save({ session });
        const user = await User.findById(req.user?._id).session(session);

        // push the new cart item to the user's cart
        await user?.cartItems.push(
          newCartItem._id as mongoose.Schema.Types.ObjectId
        );
        await user?.save({ session });

        const cartItems = await CartItem.find({ user: req.user?._id });
        session.commitTransaction();

        return res.status(200).json(cartItems);
      }
    } catch (error) {
      session.abortTransaction();
      throw new Error(error.message);
    }
  } catch (error) {
    next(error);
  }
};

// @desc   remove item from cart
// @route  Delete /api/cart/:id
// @access  Private
export const removeItemFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const cartItem = await CartItem.findById(id).session(session);
      const user = await User.findById(req.user?._id).session(session);

      // deleting the cart item
      await cartItem?.remove({ session });

      //finding the index of cart item in user's cart to remove it, if it exists
      const index = user?.cartItems.indexOf(
        cartItem?._id as mongoose.Schema.Types.ObjectId
      );

      // if cartItems exists, remove it
      if (index && index > -1) {
        user?.cartItems.splice(index, 1);
      }

      await user?.save({ session });
      const cartItems = await CartItem.find({ user: req.user?._id });
      session.commitTransaction();
      res.status(200).json(cartItems);
    } catch (error) {
      session.abortTransaction();
      throw new Error(error.message);
    }
  } catch (err) {
    next(err);
  }
};

// @desc   Empty cart
// @route  DELETE /api/cart/
// @access  Private
export const emptyCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const user = await User.findById(req.user?._id).session(session);

      // deleting all cart items
      await CartItem.deleteMany({ user: user?._id }, { session });
      // setting user's cart to empty
      user?.cartItems.splice(0, user?.cartItems.length);

      await user?.save({ session });
      session.commitTransaction();
      res.status(200).json({ message: "Cart emptied" });
    } catch (error) {
      session.abortTransaction();
      throw new Error(error.message);
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Get All user cart items
// @route  Get /api/cart/
// @access  Private
export const getAllCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartItems = await CartItem.find({ user: req.user?._id });
    res.status(200).json(cartItems);
  } catch (error) {
    next(error);
  }
};

// @desc   Change cart item quantity
// @route  POST /api/cart/:id
// @access  Private
export const changeQty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { qty }: { id: string; qty: number } = req.body;

    const cartItem = await CartItem.findById(id);
    if (cartItem) {
      cartItem.qty = qty;
      await cartItem.save();
      const cartItems = await CartItem.find({ user: req.user?._id });
      res.status(200).json(cartItems);
    } else {
      throw new Error("Cart item not found");
    }
  } catch (error) {
    next(error);
  }
};
