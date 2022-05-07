import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ICartItem } from "../Interfaces/cart.interface";
import CartItem from "../models/cartItem.model";
import User from "../models/user.model";

export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { price, qty, productId, image, name }: ICartItem = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const cartItem = await CartItem.find({ productId });
      if (cartItem.length > 0) {
        console.log(cartItem);
        await CartItem.updateOne({ productId }, { $inc: { qty: qty } });

        await session.commitTransaction();
        return res.status(200).json(cartItem);
      } else {
        console.log("new");
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
        await user?.cartItems.push(
          newCartItem._id as mongoose.Schema.Types.ObjectId
        );
        await user?.save({ session });

        // await cartItem.populate("user", "name email");
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

      await cartItem?.remove({ session });
      //   await user?.cartItems.remove(
      //     cartItem._id as mongoose.Schema.Types.ObjectId
      //   );
      const index = user?.cartItems.indexOf(
        cartItem?._id as mongoose.Schema.Types.ObjectId
      );
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
      await CartItem.deleteMany({ user: user?._id }, { session });
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

export const cartInitAfterLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body.cartItems);
    const user = await User.findById(req.user?._id);
    const cartItems = user?.cartItems;

    //@todo
    // check for each Cartitem in req.body and if it is in user.cartItem, then increment the qty, if not create a new
    // cartItem document and push it to user.cartItems and return cartItems

    return res.json(cartItems);
  } catch (error) {
    next(error);
  }
};

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
